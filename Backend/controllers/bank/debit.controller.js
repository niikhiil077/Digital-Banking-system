import mongoose from "mongoose";
import { Bank } from "../../models/bank.model.js";
import { Transaction } from "../../models/transaction.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";

export const debitController = asyncHandler(async (req, res, next) => {

    const userId = req.user.userId;

    const amount = Number(req.body.amount);

    if (amount <= 0) {
        throw new Error('Amount can never be zero or negative');
    }

    const userAccount = await Bank.findOne({ accountHolderId: userId });

    if (!userAccount) {
        throw new Error('Internal error while fethcing user account');
    }


    if (amount > userAccount.balance) {
        throw new errorResponse(400, 'Unsufficient balance', 'Insufficient balance in your account');
    }

    //start session

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const transaction = await Transaction.create([{
            transactionMethod: "Debit",
            userId: userId,
            fromAccount: userAccount._id,
            amount: amount
        }], { session })

        const tx = transaction[0];


        const updatedUserAccount = await Bank.findOneAndUpdate(
            {
                accountHolderId: userId
            },
            {
                $inc: { balance: -amount },
            },
            {
                returnDocument: 'after',
                session
            }
        )

        if (!updatedUserAccount) {
            throw new errorResponse(500, 'Debit failed', 'Failed debit transaction from your account');
        }

        tx.status = "success";
        await tx.save({ session });

        await session.commitTransaction();

        res
            .status(200)
            .json({
                fromAccount: updatedUserAccount.accNo,
                message: "Amount debitted successfully",
                transactionId: tx._id,
                remainingBalance: updatedUserAccount.balance
            })
    } catch (error) {
        session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }


})