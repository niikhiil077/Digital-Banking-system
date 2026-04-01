import { Bank } from "../../models/bank.model.js";
import { getAllTransaction, getUserSpecificTransaction } from "../../utils/Application-utilities/Transaction.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const allTransactionController = asyncHandler(async (req, res, next) => {
    const userId = req.user.userId
    const data = await getAllTransaction(userId);

    return res.status(200).json(data);
})

export const userSpecificTransactionController = asyncHandler(async (req, res, next) => {

    const userId = req.user.userId
    const recieverAccNo = req.body?.recieverAccNo || null;

    if(!recieverAccNo){
        throw new Error('Reciever account no is not defined')
    }

    const bank = await Bank.findOne({accNo:recieverAccNo});

    if(!bank){
        throw new Error('Invalid reciever account number provided')
    }

    const data = await getUserSpecificTransaction(userId, bank._id)

    res.status(200).json(data);

})