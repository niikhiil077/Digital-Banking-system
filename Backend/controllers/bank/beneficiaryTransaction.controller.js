import mongoose, { Mongoose } from "mongoose";
import { Beneficiary } from "../../models/beneficiar.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { Bank } from "../../models/bank.model.js";
import { Transaction } from "../../models/transaction.model.js";

export const beneficiaryTransactionController = asyncHandler(async (req, res, next) => {

    const userId = req.user.userId;
    const recieverBankId = req.body?.bankId || null;
    const amount = req.body?.amount || null;

    if (!recieverBankId) {
        throw new Error('Recievers Bank id is required')
    }

    if (!amount) {
        throw new Error('Amount is not defined')
    }

    if (!mongoose.Types.ObjectId.isValid(recieverBankId)) {
        throw new Error('Recievers bank id is not a valid mongoose object')
    }

    const list = await Beneficiary.find({ userId: userId, recieverBankId: recieverBankId });

    if (!list.length) {
        throw new Error('No beneficiary found with this bank id...{Add beneficiary via once doing netbanking payment} ')
    }

    const sendersBank = await Bank.findOne({ accountHolderId: userId });

    if (sendersBank.balance < amount || amount <= 0) {
        throw new Error('Invalid / Insufficient amount ... {Amount can nevr be zero or negative or bank balance is not sufficient} ')
    }




    const recieverBank = await Bank.findOne({ _id: recieverBankId })

    if (!recieverBank) {
        throw new Error("Account do not exist with this bank ID");
    }

    const transaction = await Transaction.create({
        transactionMethod: "Beneficiary",
        userId: userId,
        fromAccount: sendersBank._id,
        toAccount: recieverBank._id,
        amount: amount
    })

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        sendersBank.balance -= Number(amount);
        recieverBank.balance += Number(amount);

        const updatedSendersBank = await sendersBank.save({ session });
        if (!updatedSendersBank) {
            transaction.status = "failed"
            await transaction.save();
            throw new Error("Error while debitting money from sender bank")
        }

        const updatedRecieversBank = await recieverBank.save({ session });
        if (!updatedRecieversBank) {
            transaction.status = "failed"
            await transaction.save();
            throw new Error("Error while creditting money from sender bank")
        }

        transaction.status = "success"
        await transaction.save({ session })

        await session.commitTransaction();

        return res.json({
            message: "Money transfered successfully",
            fromAccount: sendersBank.accNo,
            toAccount: recieverBank.accNo,
            amount: amount,
            remainingBalance: updatedSendersBank.balance
        })


    } catch (error) {
        await session.abortTransaction();
        transaction.status = "failed";
        await transaction.save();

        throw error;
    } finally {
        session.endSession()
    }

})

