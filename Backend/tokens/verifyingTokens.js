import jwt, { decode } from "jsonwebtoken"
import { config } from "../config/env.js"
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";


export const verifyAccessToken = async (accessToken) => {

    if (!accessToken) {
        throw new Error("access token is undefined");
    }


    const decoded = await jwt.verify(accessToken, config.JWT_SECRET);

    if (!decoded) {
        throw new errorResponse(401, 'Invalid accessToken', 'Access token is expired or invalid');
    }

    const { userId, name, mobileNo, accType } = decoded;

    const data = {
        userId: userId,
        name: name,
        mobileNo: mobileNo,
        accType: accType
    }

    return data;
}


export const verifyRefreshToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Refresh token is required")
    }

    const decoded = await jwt.verify(refreshToken, config.JWT_SECRET);

    if (!decoded) {
        throw new errorResponse(401, 'Expired refreshToken', 'Refresh token is invalid or expired');
    }

    return decoded.userId;


}

