
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import { User } from "../models/user.model.js";


// GENERATING ACCESS TOKENS 


export const generateAccessToken = async (userId) => {

    if (!userId) {
        throw new errorResponse(400, 'Empty userId', 'requires userId for generating Access token', null)
    }

    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new errorResponse(401, 'Invalid user', 'user not found while generating accesstoken', null)
    }

    const payloads = {
        userId: user._id,
        name: user.name,
        mobileNo: user.mobileNo,
        accType: user.accType
    }

    const accessToken = await jwt.sign(
        payloads,
        config.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

    return accessToken;
}






// GENERATING REFRESH TOKENS 


export const generateRefreshToken = async (userId) => {

    if (!userId) {
        throw new errorResponse(400, 'Empty userId', 'require userId for generating Refresh token', null)
    }

    const payloads = { userId: userId }

    const refreshToken = await jwt.sign(
        payloads,
        config.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )

    return refreshToken;

}