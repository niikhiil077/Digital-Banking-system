import express from 'express'
import { registerUserController, validateInputsController } from '../../controllers/user/registerUser.controller.js';
import { loginUserController } from '../../controllers/user/loginUser.controller.js';
import { verifyUserMiddleware } from '../../middlewares/verifyUser.middleware.js';
import { getVerifyUserController } from '../../controllers/user/getVerifyUserData.controller.js';
import { tokenRefreshingController } from '../../controllers/user/tokenRefreshing.controller.js';
import { logoutController } from '../../controllers/user/logoutUser.controller.js';


export const authRouter = express.Router();

authRouter
.route('/register')
.post(
    validateInputsController,
    registerUserController
)

authRouter
.route('/login')
.post(
    loginUserController
)

authRouter
.route('/verify-user')
.get(
    verifyUserMiddleware,
    getVerifyUserController
)

authRouter
.route('/refresh-token')
.get(
    tokenRefreshingController
)


authRouter
.route('/logout')
.get(
    logoutController
)