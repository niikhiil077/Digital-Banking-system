import { Transaction } from "../../models/transaction.model.js";

export const getAllTransaction = async (userId) => {
  const list = await Transaction.find({ userId: userId })
    .select("_id toAccount amount status transactionMethod transactionMode")
    .populate({
      path: "toAccount",
      select: "accNo",
    });

  if (!list.length) {
    return "No transaction till yet";
  }

  return list;
};

export const getUserSpecificTransaction = async (userId, recieverBankId) => {
  const list = await Transaction.find({
    userId: userId,
    toAccount: recieverBankId,
  })
    .select("_id toAccount amount status transactionMethod transactionMode")
    .populate({
      path: "toAccount",
      select: "accNo",
    });

  if (!list.length) {
    return "No transaction to this specific user";
  }

  return list;
};
