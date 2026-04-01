import { Card } from "../../models/card.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const cardStatusController = asyncHandler(async (req, res, next) => {

    const { cardNo, cvv, expMonth, expYear, status } = req.body;

    if (!cardNo || !cvv || !expMonth || !expYear || !status) {
        throw new Error('Provide all neccessary field to validate further');
    }

    if (status !== 'Active' && status !== 'InActive' && status !== 'Blocked') {
        throw new Error('Invalid card status change requested');
    }

    // DB CARD DATA

    const dbCardNo = req.card.cardNo;
    const dbCvv = req.card.cvv;
    const dbExp = req.card.exp;

    // REQ BODY DATA OF MONTH AND YEAR EXP

    const month = parseInt(expMonth);
    const year = parseInt(expYear);

    const dbExpMonth = dbExp.getMonth() + 1;
    const dbExpYear = dbExp.getFullYear() % 100;



    if (cardNo !== dbCardNo || Number(cvv) !== dbCvv) {
        throw new Error("Invalid credentials provided..{cardNo or cvv} ");
    }

    if (month !== dbExpMonth || year !== dbExpYear) {
        throw new Error('card Exp is invalid');
    }

    next();


});


export const cardStatus2Controller = asyncHandler(async (req, res, next) => {

    const requestedStatus = req.body.status;
    const userId = req.user.userId;
    const dbCardNo = req.card.cardNo;
    const dbCvv = req.card.cvv;
    const dbExp = req.card.exp;



    const card = await Card.findOne({ cardHolderUserId: userId });

    if (!card) {
        throw new Error('Db error while fetching your card');
    }

    if (card.status === requestedStatus) {
        res.status(200).json({
            code: requestedStatus,
            message: `Your card is already been set to ${card.status} state`
        })
    }

    card.status = requestedStatus;
    await card.save();


    res
        .status(200)
        .json({
            code: card.status,
            message: `Your card has been set ${card.status}`
        })


})