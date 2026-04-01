
import { errorResponse } from "../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import { verifyAccessToken } from "../tokens/verifyingTokens.js";
import { asyncHandler } from "../utils/responseHandling-&-AsyncHandling/asyncHandler.js"
import { Bank } from "../models/bank.model.js";



// verifying User wheather it is authorized to used further secured routes or not 



export const verifyUserMiddleware = asyncHandler(
    async (req, res, next) => {

        const accessToken = req.headers?.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new errorResponse(401, 'AccessToken not recived', 'Access token is not defined');
        }

        const data = await verifyAccessToken(accessToken);

        const bank = await Bank.findOne({
            accountHolderId: data.userId,
            accountStatus: 'Active'
        })

        if (!bank) {
            throw new errorResponse(401, 'UnAuthorized Account', 'Your account is blocked to proceed further transactions or service... kindly re-Active your account');
        }

        if (!data) {
            throw new Error(500, 'DATA fetching error', 'Failure while fetching data from access token to veirfyUser middleware');
        }

        req.user = data;

        next();

    }
);


export const blockedUserMiddleware = asyncHandler(
    async (req, res, next) => {

        const accessToken = req.headers?.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new errorResponse(401, 'AccessToken not recived', 'Access token is not defined');
        }

        const data = await verifyAccessToken(accessToken);

        const bank = await Bank.findOne({
            accountHolderId: data.userId
        })

        if(!bank){
            throw new Error('Your account is not blocked to proceed furtther in this middleware');
        }

        req.user = data;

        next();

    })
