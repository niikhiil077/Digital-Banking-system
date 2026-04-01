import { Bank } from "../models/bank.model.js";
import { Transaction } from "../models/transaction.model.js";
import { asyncHandler } from "../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";

export const netBankingMiddleware = asyncHandler(async (req, res, next) => {


    // input sender userId

    const senderUserId = req.user.userId;

    //input amount

    const amount = Number(req.body.amount);
    const {IFSCcode} = req.body;
    const { transactionMode } = req.body;
    const {addBeneficiary} = req.body;

    if (!transactionMode || !IFSCcode || !amount) {
        throw new Error('please provide all the required fields...{TransactionMode, Amount , IFSCcode} ');
    }

    if (transactionMode !== 'IMPS' && transactionMode !== 'RTGS' && transactionMode !== 'NEFT') {
        throw new Error('Enter a valid transaction mode {NEFT , RTGS , IMPS } ');
    }

    //input receiver account

    const { recieverAccNo } = req.body;

    if (!recieverAccNo) {
        throw new Error('Reciever account number is not defined');
    }

    const recieverAccount = await Bank.findOne({ accNo: recieverAccNo , IFSCcode:IFSCcode });

    if (!recieverAccount) {
        throw new Error('Reciver account does not exist with given account number or IFSC code...Enter valid values')
    }

    // amount validation and checks

    if (amount <= 0) {
        throw new Error('Amount can never be in negative or zero');
    }

    const senderAccount = await Bank.findOne({ accountHolderId: senderUserId });

    if (amount > senderAccount.balance) {

        await Transaction.create({
            transactionMethod: "Net Banking",
            transactionMode: transactionMode,
            userId: senderUserId,
            fromAccount: senderAccount._id,
            toAccount: recieverAccount._id,
            amount: amount,
            status: "failed",
            message: "Insufficient balance"
        })

        throw new errorResponse(400, 'Unsufficient balance', 'Balance is unsufficient in your account');
    }

    //return object data

    const data = {
        senderUserId: senderUserId,
        transactionMode: transactionMode,
        amount: amount,
        recieverAccount: recieverAccount,
        addBeneficiary:addBeneficiary
    }

    req.data = data;

    next();


});