import mongoose from "mongoose";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { Bank } from "../../models/bank.model.js";
import { Card } from "../../models/card.model.js";
import { User } from "../../models/user.model.js";

export const deleteAccountController = asyncHandler(async (req, res, next) => {

    const {confirmation} = req.body;

    if(!confirmation || confirmation!=="confirmed"){
        throw new Error('Please confirm if you want to delete your account or abort the process');
    }

    const userId = req.user.userId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Bank.findOneAndDelete({ accountHolderId: userId }).session(session);
        await Card.findOneAndDelete({ cardHolderUserId: userId }).session(session);

        await User.findOneAndDelete({ _id: userId }).session(session);

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }


    res
    .status(200)
    .json({
        code:"deleted Account",
        message:"Bank details , card data and your account has been deleted"
    })

})