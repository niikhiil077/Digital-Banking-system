import { User } from "../../models/user.model.js";
import { verifyRefreshToken } from "../../tokens/verifyingTokens.js";
import crypto from 'crypto'

export const logoutController = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_Token;

    if (!refreshToken) {
        throw new Error('refresh token not sent while logout');
    }

    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const userId = await verifyRefreshToken(refreshToken);

    const user = await User.findOne({ _id: userId });

    if (hashedRefreshToken !== user.refreshToken) {
        throw new Error('Invalid refresh token sent not match with db refreshToken');
    }

    await User.updateOne({ refreshToken: hashedRefreshToken }, { $unset: { refreshToken: "" } });

    res
        .clearCookie("refresh_Token")
        .status(200)
        .json({ mesage: 'User logged out successfully' })
}