import { Beneficiary } from "../../models/beneficiar.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const beneficiaryList = asyncHandler(async (req, res, next) => {
    
const userId = req.user.userId;

const list = await Beneficiary.find({userId:userId}).select("recieverName _id");

return res.json(list)

})