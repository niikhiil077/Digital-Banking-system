import express from 'express'
import { blockedUserMiddleware, verifyUserMiddleware } from '../../middlewares/verifyUser.middleware.js';
import { userDetailsController } from '../../controllers/service/user-Details.js';
import { cardStatus2Controller, cardStatusController } from '../../controllers/service/cardStatus.js';
import { cardMiddleware, cardStatusMiddleware } from '../../middlewares/cardExp.middleware.js';
import { setPinController } from '../../controllers/service/setPin.js';
import { bankStatusController } from '../../controllers/service/bankStatus.js';
import { beneficiaryList } from '../../controllers/service/beneficiaryList.js';
import { removeBeneficiaryController } from '../../controllers/service/removeBeneficiary.js';
import { searchController } from '../../controllers/service/serach.js';
import { allTransactionController, userSpecificTransactionController } from '../../controllers/service/transaction.js';
import { personalDetailsController } from '../../controllers/service/personalDetails.js';


export const serviceRouter = express.Router();

serviceRouter
    .route('/user-details')
    .get(
        verifyUserMiddleware,
        userDetailsController
    )

    serviceRouter
    .route('/personal-details')
    .get(
        verifyUserMiddleware,
        personalDetailsController
    )

serviceRouter
    .route('/card-status')
    .post(
        verifyUserMiddleware,
        cardMiddleware,
        cardStatusController,
        cardStatus2Controller
    )

serviceRouter
    .route('/bank-status')
    .post(
        blockedUserMiddleware,
        bankStatusController
    )


serviceRouter
    .route('/set-pin')
    .post(
        verifyUserMiddleware,
        cardMiddleware,
        cardStatusMiddleware,
        setPinController
    )

serviceRouter
    .route('/getBeneficiary-list')
    .get(
        verifyUserMiddleware,
        beneficiaryList
    )


serviceRouter
    .route('/removeBeneficiary')
    .post(
        verifyUserMiddleware,
        removeBeneficiaryController
    )

serviceRouter
    .route('/search')
    .post(
        verifyUserMiddleware,
        searchController
    )


serviceRouter
    .route('/getTransaction')
    .get(
        verifyUserMiddleware,
        allTransactionController
    )
    .post(
        verifyUserMiddleware,
        userSpecificTransactionController
    )