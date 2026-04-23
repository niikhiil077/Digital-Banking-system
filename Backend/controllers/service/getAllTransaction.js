import { Transaction } from "../../models/transaction.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";

export const getAllTransactionController = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.userId;
    const users = await Transaction.aggregate([
      {
        $addFields: {
          fromAccount: { $toObjectId: "$fromAccount" },
        },
      },
      {
        $group: {
          _id: "$userId",
          fromAccount: { $first: "$fromAccount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "banks",
          localField: "fromAccount",
          foreignField: "_id",
          as: "account",
        },
      },
      {
        $project: {
          _id: 0,
          name: { $arrayElemAt: ["$user.name", 0] },
          accountNumber: { $arrayElemAt: ["$account.accNo", 0] }, // 🔥 FIX
        },
      },
    ]);
    if (!users) {
      throw new Error(
        new errorResponse(
          200,
          "No transaction",
          "You have no current transactions",
        ),
      );
    }
    res.status(200).json(users);
  },
);
