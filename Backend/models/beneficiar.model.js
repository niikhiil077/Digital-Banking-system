import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is not defined']
    },
    recieverName: {
        type: String,
        required: [true, 'Reciever name is required']
    },
    recieverBankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
        required: [true, 'Reciever Bank Id is not defined']
    },
    recieverBankAccNo: {
        type: String,
        required: [true, 'Reciever bank acc no is not defined']
    },
    recieverIFSCcode: {
        type: String,
        required: [true, 'Reciever IFSC code is required']
    }

}, { timestamps: true });

export const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);