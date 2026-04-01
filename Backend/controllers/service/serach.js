import { Card } from "../../models/card.model.js";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";

export const searchController = asyncHandler(async (req, res, next) => {

    const input = req.body?.input || null;

    if (!input) {
        throw new Error('Input is undefined')
    }

    const recieverUPI = await Card.findOne({ UPIid: input });

    if (!recieverUPI) {
        const reciever = await User.findOne({ mobileNo: input });
        const recieverCard = await Card.findOne({ cardHolderUserId: reciever?._id });
        if (!recieverUPI && !recieverCard) {
            throw new Error("No account exists with this mobile no or upi id")
        }
        return res
            .status(200)
            .json({
                message: "user found",
                recieverName: recieverCard?.cardHolderName,
                recieverUPIid: recieverCard?.UPIid
            })
    }

    return res
        .status(200)
        .json({
            message: "user found",
            recieverName: recieverUPI?.cardHolderName,
            recieverUPIid: recieverUPI?.UPIid
        })

})