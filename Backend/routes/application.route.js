import express from 'express'
import { authRouter } from './otherRoutes/authentication.route.js';
import { transactionRouter } from './otherRoutes/transaction.route.js';
import { serviceRouter } from './otherRoutes/service.route.js';
import { deleteRouter } from './otherRoutes/delete.route.js';

export const applicationRouter = express.Router();


applicationRouter.get('/',(req,res,next)=>{
    res.send('Home page')
})

applicationRouter.use('/api/auth',authRouter)

applicationRouter.use('/api/transaction',transactionRouter)

applicationRouter.use('/api/service',serviceRouter);

applicationRouter.use('/api/delete',deleteRouter)