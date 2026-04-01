
import { User } from "../models/user.model.js";
import crypto from 'crypto'
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";


// REFRESHING ACCESS TOKEN FROM REFRESH TOKEN

export const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new errorResponse(401, 'RefreshToken null', 'Refresh Token not sent while regenarting/refreshing access token');
    }

    const decoded = await jwt.verify(refreshToken, config.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId });

    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    if (hashedRefreshToken !== user.refreshToken) {
        throw new errorResponse(401, 'Invalid/Expired refreshToken', 'RefreshToken not matching with the userdb refresh token');
    }

    const payload = {
        userId: user._id,
        name: user.name,
        mobileNo: user.mobileNo,
        accType: user.accType
    }

    const accessToken = await jwt.sign(payload,
        config.JWT_SECRET, {
        expiresIn: '10m'
    }
    )

    return accessToken;
}