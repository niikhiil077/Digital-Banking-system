import mongoose from "mongoose";
import { Bank } from "../../models/bank.model.js";
import { Transaction } from "../../models/transaction.model.js";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const creditController = asyncHandler(async (req, res, next) => {

    const userId = req.user.userId;
    const amount = Number(req.body.amount);

    if (amount <= 0) {
        throw new Error('Amount can never be zero or negative');
    }

    const userAccount = await Bank.findOne({ accountHolderId: userId });

    if (!userAccount) {
        throw new Error('Internal errors while seraching user Accounts');
    }


    //session started

    const session = await mongoose.startSession();
    session.startTransaction();

    try {


        const transaction = await Transaction.create([{
            transactionMethod: "Credit",
            userId: userId,
            fromAccount: userAccount._id,
            amount: amount
        }], { session })

        const tx = transaction[0];


        const updatedUserAcc = await Bank.findOneAndUpdate(
            {
                accountHolderId: userId
            },
            {
                $inc: { balance: amount }
            },
            {
                returnDocument: 'after',
                session
            })

        if (!updatedUserAcc) {
            throw new Error('Failure while credeting money to user account')
        }

        tx.status = "success";
        await tx.save({ session })

        res
            .status(200)
            .json({
                toAccount: updatedUserAcc.accNo,
                message: "Amount credited succesfully",
                transactionId: transaction._id,
                updatedBalance: updatedUserAcc.balance,
            })

        await session.commitTransaction();

    } catch (error) {

        session.abortTransaction();
        throw error;

    } finally {
        session.endSession();
    }

})