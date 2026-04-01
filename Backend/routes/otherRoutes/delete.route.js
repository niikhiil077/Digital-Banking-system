import express from 'express';
import { verifyUserMiddleware } from '../../middlewares/verifyUser.middleware.js';
import { deleteAccountController } from '../../controllers/delete/delete.controller.js';

export const deleteRouter = express.Router();

deleteRouter
.route('/account')
.post(
    verifyUserMiddleware,
    deleteAccountController
)