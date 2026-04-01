import mongoose from "mongoose";
import { Beneficiary } from "../../models/beneficiar.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { Bank } from "../../models/bank.model.js";

export const removeBeneficiaryController = asyncHandler(async (req, res, next) => {

    const bankId = req.body.bankId || null;

    if (!bankId) {
        throw new Error('Please provide a bank id to remove from beneficiary')
    }

    if(!mongoose.Types.ObjectId.isValid(bankId)){
        throw new Error('Invalid mongoose object id')
    }

    const bankObjectId =  new mongoose.Types.ObjectId(bankId) ;

    const bank = await Bank.findOne({_id:bankObjectId});

    if(!bank){
        throw new Error('Account with this id doesnt exists')
    }

    const beneficiaryRemoved = await Beneficiary.findOneAndDelete({ recieverBankId: bankId });

    if (!beneficiaryRemoved) {
        throw new Error('Invalid bank id provided');
    }

    return res.status(200).json("Successfully removed this bank Id from beneficiary");

})