
// Sticking metaData over every incoming requests 


export const requestData = (req, _, next) => {
    req.requestId = crypto.randomUUID();
    req.recievedAt = Date.now();
    req.reqTimestamps = new Date().toISOString();
    next();
}