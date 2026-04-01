import { Beneficiary } from "../models/beneficiar.model.js";
import { asyncHandler } from "../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const beneficiaryMiddleware = asyncHandler( async (req, res, next) => {
    const data = req.data;
    const addBeneficiary = req.data.addBeneficiary || null;

    if (!addBeneficiary) {
        console.log('No benficiray recived');
        
        return next();
    }

    if (addBeneficiary && addBeneficiary !== true) {
        throw new Error('Invalid beneficiary adding request..Send {true} to add beneficiary')
    }

    const recieverAccount = await data.recieverAccount.populate("accountHolderId","name");
    console.log(recieverAccount);
    
    

const beneficiary = await Beneficiary.create({
    userId:req.user.userId,
    recieverName:recieverAccount.accountHolderId.name,
    recieverBankId:recieverAccount._id,
    recieverBankAccNo:recieverAccount.accNo,
    recieverIFSCcode:recieverAccount.IFSCcode
})

    next();
}
)