import bcrypt from "bcryptjs";
import { verifyAccessToken } from "../../tokens/verifyingTokens.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { User } from "../../models/user.model.js";
import { Bank } from "../../models/bank.model.js";

export const bankStatusController = asyncHandler(async (req, res, next) => {

    const { confirmation, password, status } = req.body || undefined;

    if (!confirmation || !password || !status) {
        throw new Error('please provide confirmation with your password and status');
    }

    if (confirmation !== "confirmed") {
        throw new Error('Confirm your account status change request or go Back');
    }

    if (status !== "Active" && status !== "Blocked") {
        throw new Error('Enter a valid account status')
    }

    const user = await User.findOne({ _id: req.user.userId });

    const isPasswordTrue = await bcrypt.compare(password, user.password);

    if (!isPasswordTrue) {
        throw new Error('Your password is incorrect')
    }

    const bank = await Bank.findOneAndUpdate({
        accountHolderId: req.user.userId
    }, {
        $set: { accountStatus: status }
    }, {
        returnDocument: "after"
    })

    if (!bank) {
        throw new Error('Some db error while switching account status');
    }

    res.status(200).json({
        code:"Account updated",
        message:`Your account has successfully been set at ${status} status `
    })


})