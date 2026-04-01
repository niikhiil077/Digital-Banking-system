import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { Card } from "../../models/card.model.js"

export const setPinController = asyncHandler(async (req, res, next) => {


    const userId = req.user.userId;


    const UPIpin = Number(req.body?.UPIpin);

    if (!UPIpin || UPIpin === NaN || String(UPIpin).length !== 6) {
        throw new Error('Please provide a 6 real digits UPI pin');
    }

    const card = await Card.findOneAndUpdate({
        cardHolderUserId: userId
    }, {
        $set: { pin: UPIpin }
    },{
        returnDocument:"after"
    })

    if(!card){
        throw new Error('Db Error while updating pin of your debit card');
    }

    res
    .status(200)
    .json('Your pin has been sucessfully set')


})