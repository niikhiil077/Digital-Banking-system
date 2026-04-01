import { User } from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../tokens/generateTokens.js";
import { apiResponse } from "../../utils/responseHandling-&-AsyncHandling/apiResponse.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import { bcryptCompare } from "../../utils/Application-utilities/bcrypt.utils.js";
import crypto from 'crypto'
import { Bank } from "../../models/bank.model.js";


export const loginUserController = asyncHandler(async (req, res, next) => {
    const { mobileNo, password } = req.body;

    const user = await User.findOne({ mobileNo: mobileNo });

    if (!user) {
        throw new errorResponse(400, 'Invalid user', 'User dont exist with this mobile number');
    }

    const userId = await bcryptCompare(mobileNo, password);

    if (!userId) {
        throw new errorResponse(401, 'Invalid credentails', 'User verification failed')
    }

    const refreshToken = await generateRefreshToken(userId);
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const accessToken = await generateAccessToken(userId);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    const bank = await Bank.findOne({ accountHolderId: user._id });
    if (!bank) {
        throw new Error('Error while fetch user bank account while login')
    }

    res
        .status(200)
        .cookie("refresh_Token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(
            new apiResponse(200, 'Login succesful', 'User is verified and login succesfully', {
                user: {
                    userId: user._id,
                    name: user.name,
                    dob: user.dob,
                    mobileNo: user.mobileNo,
                    email: user.email,
                },
                BankDetails: {
                    bankId: bank._id,
                    accNo: bank.accNo,
                    accType: user.accType,
                    branch: user.branch,
                },
                accessToken: accessToken
            })
        )

})