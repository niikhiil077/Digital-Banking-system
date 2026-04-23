import { Transaction } from "../../models/transaction.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";

export const getAllTransactionController = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.userId;
   const users = await Transaction.aggregate([
  {
    $addFields: {
      toAccount: { $toObjectId: "$toAccount" }, // receiver account
    },
  },
  {
    $group: {
      _id: "$toAccount",
    },
  },
  {
    $lookup: {
      from: "banks",
      localField: "_id",
      foreignField: "_id",
      as: "account",
    },
  },
  {
    $project: {
      account: { $arrayElemAt: ["$account", 0] },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "account.accountHolderId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $project: {
      _id: 0,
      name: { $arrayElemAt: ["$user.name", 0] },
      accountNumber: "$account.accNo",
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
