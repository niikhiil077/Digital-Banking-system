export class apiResponse {
    constructor(statusCode = 200, code, message = "Succesfully response sent", data = null, requestId=null, recievedAt) {
        this.statusCode = statusCode;
            this.success = true;
            this.code = code;
            this.message = message;
            this.data = data;
            this.requestId = requestId;
            this.meta = {
                timeStamps: new Date().toISOString(),
                respondedAt: Date.now(),
                responseDuration: recievedAt? Date.now() - recievedAt : undefined
            }

    }
}