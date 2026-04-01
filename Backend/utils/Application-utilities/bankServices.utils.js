import { Transaction } from "../../models/transaction.model.js";
import { asyncHandler } from "../responseHandling-&-AsyncHandling/asyncHandler.js";

export const dailyTransaction = async (userId) => {

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalTransaction = await Transaction.aggregate([
        {
            $match: {
                userId: userId,
                transactionMode: 'IMPS',
                createdAt: { $gte: startOfDay, $lte: endOfDay },
                status: "success"
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ])

    const totalAmount = totalTransaction[0]?.totalAmount || 0;

    return totalAmount;
}