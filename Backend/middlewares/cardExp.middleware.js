import { Card } from "../models/card.model.js";
import { asyncHandler } from "../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";

export const cardMiddleware = asyncHandler(async (req, resizeBy, next) => {


    const userId = req.user.userId;

    const card = await Card.findOne({ cardHolderUserId: userId });

    if (!card) {
        throw new Error('Db Error while fetching card from db');
    }

    if (card.exp < Date.now()) {
        throw new errorResponse(401, 'Card expired', `Your card has been expired on ${card.exp}`);
    }

    const cardData = {
        userId:card.cardHolderUserId,
        cardNo: card.cardNo,
        exp: card.exp,
        cvv: card.cvv,
        UPIid:card.UPIid,
        pin:card.pin
    }

    req.card = cardData;


    next();

})

export const cardStatusMiddleware = asyncHandler(async (req, res, next) => {




    const userId = req.user.userId;

    const card = await Card.findOne({ cardHolderUserId: userId });

    if (!card) {
        throw new Error('Db Error while fetching card from db');
    }

    if (card.status === 'Blocked') {
        throw new Error("Your debit card is blocked.. can't proceed further ");
    }

     if (card.status === 'InActive') {
        throw new Error('Your card is InActive... activate it first to proceed further')
    }

    next();

});


export const cardPinMiddleware = asyncHandler(async (req, res, next) => {



    const userId = req.user.userId;

    const card = await Card.findOne({ cardHolderUserId: userId });

    if (!card) {
        throw new Error('Db Error while fetching card from db');
    }

    if (card.pin === null) {
        throw new Error('Please first set your card UPI Pin to proceed further services')
    }

    next();

})
