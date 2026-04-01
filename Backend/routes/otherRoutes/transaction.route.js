import express from 'express'
import { netBankingController } from '../../controllers/bank/netBanking.controller.js';
import { verifyUserMiddleware } from '../../middlewares/verifyUser.middleware.js';
import { creditController } from '../../controllers/bank/credit.controller.js';
import { debitController } from '../../controllers/bank/debit.controller.js';
import { netBankingMiddleware } from '../../middlewares/netBanking.middleware.js';
import { cardMiddleware, cardPinMiddleware, cardStatusMiddleware } from '../../middlewares/cardExp.middleware.js';
import { upiTransactionController } from '../../controllers/bank/upiTransaction.controller.js';
import { beneficiaryMiddleware } from '../../middlewares/beneficiary.middleware.js';
import { beneficiaryTransactionController } from '../../controllers/bank/beneficiaryTransaction.controller.js';

export const transactionRouter = express.Router();

transactionRouter
    .route('/banktransfer')
    .post(
        verifyUserMiddleware,
        netBankingMiddleware,
        beneficiaryMiddleware,
        netBankingController
    )

transactionRouter
    .route('/credit')
    .post(
        verifyUserMiddleware,
        creditController
    )

transactionRouter
    .route('/debit')
    .post(
        verifyUserMiddleware,
        debitController
    )


transactionRouter
    .route('/upi')
    .post(
        verifyUserMiddleware,
        cardMiddleware,
        cardStatusMiddleware,
        cardPinMiddleware,
        upiTransactionController
    )


transactionRouter
    .route('/beneficiary')
    .post(
        verifyUserMiddleware,
        beneficiaryTransactionController
    )