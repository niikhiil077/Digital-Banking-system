import mongoose from "mongoose";
import { Card } from "../../models/card.model.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { Bank } from "../../models/bank.model.js";
import { Transaction } from "../../models/transaction.model.js";

export const upiTransactionController = asyncHandler(async (req, res, next) => {
  const { pin, recieverUPIid, amount } = req.body;

  if (!pin || !recieverUPIid || !amount) {
    throw new Error(
      "Please provide recivers UPI id and your UPI pin with amount ",
    );
  }

  if (Number(pin) !== req.card.pin) {
    throw new Error("Invalid card pin");
  }

  const reciever = await Card.findOne({ UPIid: recieverUPIid });

  if (!reciever) {
    throw new Error("Invalid reciever UPI Id");
  }

  const bank = await Bank.findOne({ accountHolderId: req.user.userId });

  if (amount > bank.balance || amount <= 0) {
    throw new Error(
      "Insufficient Balance || amount cannot be negative or zero",
    );
  }

  const senderCard = await Card.findOne({ cardHolderUserId: req.user.userId });
  if (!senderCard) {
    throw new Error("DB Error while fetch your card");
  }

  if (senderCard.UPIid === recieverUPIid) {
    throw new Error("We dont support self transfer at this moment");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transaction = await Transaction.create(
      [
        {
          transactionMethod: "UPI",
          userId: req.user.userId,
          fromAccount: senderCard.accountLinked,
          toAccount: reciever.accountLinked,
          amount: amount,
        },
      ],
      { session },
    );

    const tx = transaction[0];

    const updatedSenderAccount = await Bank.findOneAndUpdate(
      { accountHolderId: req.card.userId },
      {
        $inc: { balance: -amount },
      },
      {
        returnDocument: "after",
      },
    ).session(session);

    if (!updatedSenderAccount) {
      tx.status = "failed";
      tx.message = "Error while debitting money from senders account";
      await tx.save({ session });
      throw new Error("Error while debitting money from senders account");
    }

    const updatedRecieverAcccount = await Bank.findOneAndUpdate(
      { accountHolderId: reciever.cardHolderUserId },
      {
        $inc: { balance: amount },
      },
      {
        returnDocument: "after",
      },
    ).session(session);

    if (!updatedRecieverAcccount) {
      tx.status = "failed";
      tx.message = "Error while creditting money to recivers account";
      await tx.save({ session });
      throw new Error("Error while creditting money to recivers account");
    }

    tx.status = "success";
    await tx.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      code: "payment successful",
      from: req.card.UPIid,
      to: recieverUPIid,
      amount: amount,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});
