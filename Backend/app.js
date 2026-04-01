// IMPORTING MODULES

import express from 'express'
import cookieParser from 'cookie-parser';
import { requestData } from './middlewares/request.middleware.js';
import { applicationRouter } from './routes/application.route.js';




export const app = express();


// EXPRESS Middlewares 

app.use(requestData);
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());


// Routing 

app.use(applicationRouter)




// Global error Handler

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        errorCode: err.errorCode || "Internal error",
        message: err.message || "Something went wrong",
        Errors: err.Errors || {},
        requestId: err.requestId || req.requestId,
        respondedAt: err.respondedAt || Date.now(),
        resTimestamps: err.resTimestamps || new Date().toISOString(),
        responseDuration: err.responseDuration ||
            req.recievedAt ? Date.now() - req.recievedAt : undefined
    })
})