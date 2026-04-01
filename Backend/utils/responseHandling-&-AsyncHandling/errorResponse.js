export class errorResponse extends Error {
    constructor(statusCode = 400, errorCode = "Internal Error", message = "Something went wrong", Errors = null, requestId=null, recievedAt) {
        super(message);
        this.statusCode = statusCode;
            this.success = false;
            this.errorCode = errorCode;
            this.Errors = Errors;
            this.requestId = requestId;
            this.meta = {
                resTimestamps: new Date().toISOString(),
                respondedAt: Date.now(),
                duration: recievedAt ? Date.now() - recievedAt : undefined
            }

        Error.captureStackTrace(this, this.constructor)
    }
}