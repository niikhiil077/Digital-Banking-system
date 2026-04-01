import { User } from "../../models/user.model.js";
import { generateRefreshToken } from "../../tokens/generateTokens.js";
import { refreshAccessToken } from "../../tokens/refreshingTokens.js";
import { verifyRefreshToken } from "../../tokens/verifyingTokens.js";
import { apiResponse } from "../../utils/responseHandling-&-AsyncHandling/apiResponse.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import crypto from "crypto"

export const tokenRefreshingController = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_Token;

    if (!refreshToken) {
        throw new Error('Refresh token not sent while token refreshening');
    }

    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
        throw new Error('userid not found from refresh token ... invalid or revoked refresh token');
    }

    const user = await User.findOne({ _id: userId });

    const accessToken = await refreshAccessToken(refreshToken);

    if (!accessToken) {
        throw new errorResponse(500, 'Access Token null', 'Failed fetching accestoken while refrshing the access token in token refrehsing controller');
    }

    const newRefreshToken = await generateRefreshToken(userId);
    const newHashedRefreshToken = await crypto.createHash('sha256').update(newRefreshToken).digest('hex');

    user.refreshToken = newHashedRefreshToken;
    await user.save();

    res
        .status(200)
        .cookie("refresh_Token", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(new apiResponse(200, 'Verified refresh token', 'Refreshed access token succesfully', {
            accessToken: accessToken
        }))
}