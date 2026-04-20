import { Card } from "../../models/card.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const getCardDetailsController = asyncHandler(async(req,res,next)=>{
    const card = await Card.findOne({cardHolderUserId:req.user.userId});

    if(!card){
        throw new Error('Failed to load card from db');
    }

    res.status(200).json({
        cardNo:card.cardNo,
        name:card.cardHolderName,
        exp:card.exp,
        cvv:card.cvv,
        status:card.status,
        upiId:card.upiId
    })
})