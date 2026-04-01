import mongoose from "mongoose";
import { Bank } from "../../models/bank.model.js";
import { Transaction } from "../../models/transaction.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import { dailyTransaction } from "../../utils/Application-utilities/bankServices.utils.js";

export const netBankingController = asyncHandler(async (req, res, next) => {

    const data = req.data;
    const transactionMode = req.data.transactionMode;



    const senderUserId = new mongoose.Types.ObjectId(data.senderUserId);

    const senderAccount = await Bank.findOne({ accountHolderId: senderUserId });

    if (!senderAccount) {

        await Transaction.create({
            transactionMethod: "Net Banking",
            transactionMode: transactionMode,
            userId: senderUserId,
            fromAccount: senderAccount._id || null,
            toAccount: data.recieverAccount._id,
            amount: data.amount,
            status: "failed",
            message: "Internal error while fetching user account"
        })

        throw new Error('Internal errors while fetching user account');
    }

    const totalTransaction = await dailyTransaction(senderUserId);

    //session start 

    const session = await mongoose.startSession();
    session.startTransaction();




    //  transaction mode based function...  

    switch (transactionMode) {

        // ******************************* IMPS ***********************************

        case 'IMPS':


            try {

                //transaction creation 



                if (totalTransaction >= 200000) {
                    throw new errorResponse(400, 'Maximum limit reached', 'You have reached your maximum transfer limit over 200000...try again tomorrow');
                }

                if ((totalTransaction + data.amount) > 200000) {
                    throw new errorResponse(400, 'unsuffiecient Limit', `You remaining limit is just ${200000 - totalTransaction}`)
                }

                if (data.amount > 100000) {
                    throw new errorResponse(400, 'Unauthorized', 'You cannot send more than 1 lakhs at one time');
                }

                const transaction = await Transaction.create([{
                    transactionMethod: "Net Banking",
                    transactionMode: 'IMPS',
                    userId: senderUserId,
                    fromAccount: senderAccount._id,
                    toAccount: data.recieverAccount._id,
                    amount: data.amount
                }], { session })

                const tx = transaction[0];

                const updatedSenderAcc = await Bank.findOneAndUpdate(
                    {
                        accountHolderId: senderAccount.accountHolderId
                    },

                    {
                        $inc: { balance: -data.amount }
                    },
                    {
                        returnDocument: 'after',
                        session
                    }
                )


                if (!updatedSenderAcc) {
                    throw new errorResponse(500, 'Transaction failed', 'Transaction failure while debiting amount from senders bank');
                }

                const updatedRecieverAcc = await Bank.findOneAndUpdate({
                    accNo: data.recieverAccount.accNo
                }, {
                    $inc: { balance: data.amount }
                }, {
                    returnDocument: 'after',
                    session
                })


                if (!updatedRecieverAcc) {
                    throw new errorResponse(500, 'Transacation failed', 'Transaction failure while crediting amount to recievers bank');
                }


                tx.status = "success";
                await tx.save({ session })


                await session.commitTransaction();


                return res
                    .status(200)
                    .json({
                        message: "Money transfer successful",
                        fromAccount: senderAccount.accNo,
                        toAccount: data.recieverAccount.accNo,
                        transactionId: tx._id,
                        remainingBalance: updatedSenderAcc.balance
                    })
            } catch (error) {

                await session.abortTransaction();

                throw error;

            } finally {
                await session.endSession();
            }

            break;


        // ******************************* NEFT ***********************************

        case 'NEFT':

            try {

                //transaction creation 



                if (data.amount > 200000) {
                    throw new errorResponse(400, 'Unauthorized', 'You cannot send more than 2 lakhs at one time');
                }

                const transaction = await Transaction.create([{
                    transactionMethod: "Net Banking",
                    transactionMode: 'NEFT',
                    userId: senderUserId,
                    fromAccount: senderAccount._id,
                    toAccount: data.recieverAccount._id,
                    amount: data.amount
                }], { session })

                const tx = transaction[0];

                const updatedSenderAcc = await Bank.findOneAndUpdate(
                    {
                        accountHolderId: senderAccount.accountHolderId
                    },

                    {
                        $inc: { balance: -data.amount }
                    },
                    {
                        returnDocument: 'after',
                        session
                    }
                )


                if (!updatedSenderAcc) {
                    throw new errorResponse(500, 'Transaction failed', 'Transaction failure while debiting amount from senders bank');
                }

                const updatedRecieverAcc = await Bank.findOneAndUpdate({
                    accNo: data.recieverAccount.accNo
                }, {
                    $inc: { balance: data.amount }
                }, {
                    returnDocument: 'after',
                    session
                })


                if (!updatedRecieverAcc) {

                    throw new errorResponse(500, 'Transacation failed', 'Transaction failure while crediting amount to recievers bank');
                }


                tx.status = "success";
                await tx.save({ session })


                await session.commitTransaction();


                return res
                    .status(200)
                    .json({
                        message: "Money transfer successful",
                        fromAccount: senderAccount.accNo,
                        toAccount: data.recieverAccount.accNo,
                        transactionId: tx._id,
                        remainingBalance: updatedSenderAcc.balance
                    })
            } catch (error) {

                await session.abortTransaction();

                throw error;

            } finally {
                await session.endSession();
            }

            break;


        // ******************************* RTGS ***********************************

        case 'RTGS':


            try {

                //transaction creation 


                if (data.amount < 200000) {
                    throw new errorResponse(400, 'Unauthorized', 'You cannot send less than 2 lakhs in this mode of transaction {RTGS} ');
                }

                const transaction = await Transaction.create([{
                    transactionMethod: "Net Banking",
                    transactionMode: 'RTGS',
                    userId: senderUserId,
                    fromAccount: senderAccount._id,
                    toAccount: data.recieverAccount._id,
                    amount: data.amount
                }], { session })

                const tx = transaction[0];

                const updatedSenderAcc = await Bank.findOneAndUpdate(
                    {
                        accountHolderId: senderAccount.accountHolderId
                    },

                    {
                        $inc: { balance: -data.amount }
                    },
                    {
                        returnDocument: 'after',
                        session
                    }
                )


                if (!updatedSenderAcc) {
                    throw new errorResponse(500, 'Transaction failed', 'Transaction failure while debiting amount from senders bank');
                }

                const updatedRecieverAcc = await Bank.findOneAndUpdate({
                    accNo: data.recieverAccount.accNo
                }, {
                    $inc: { balance: data.amount }
                }, {
                    returnDocument: 'after',
                    session
                })


                if (!updatedRecieverAcc) {

                    throw new errorResponse(500, 'Transacation failed', 'Transaction failure while crediting amount to recievers bank');
                }


                tx.status = "success";
                await tx.save({ session })


                await session.commitTransaction();


                return res
                    .status(200)
                    .json({
                        message: "Money transfer successful",
                        fromAccount: senderAccount.accNo,
                        toAccount: data.recieverAccount.accNo,
                        transactionId: tx._id,
                        remainingBalance: updatedSenderAcc.balance
                    })
            } catch (error) {

                await session.abortTransaction();

                throw error;

            } finally {
                await session.endSession();
            }

            break;

        //****************************** ERROR ************************************


        default:
            throw new Error('Invalid transaction mode... {IMPS , NEFT , RTGS } ');
    }




}
)