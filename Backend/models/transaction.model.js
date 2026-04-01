import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        transactionMethod: {
            type: String,
            enum: {
                values: ['Debit', 'Net Banking', 'Credit', 'UPI', 'Cheque', 'Debit Card','Beneficiary'],
                message: "choose valid transaction method"
            }
        },
        transactionMode: {
            type: String,
            required: [function () {
                return this.transactionMethod === 'Net Banking'
            }, 'Transaction mode is required in netbanking'],
            enum: {
                values: ['IMPS', 'NEFT', 'RTGS'],
                message:'Invalid transmode mode provided'
            }
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User id is mandatory for transaction model']
        },
        fromAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank',
            required: [true, 'Initialized transaction account is mandatory']
        },
        toAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank',
            required: function () {
                return this.transactionMethod === 'Net Banking'
            }
        },
        amount: {
            type: Number,
            required: [true, 'Transaction Amount is required'],
            min: [1, 'Amount cannot be less than 1 INR']
        },
        status: {
            type: String,
            required: [true, 'transaction status is required'],
            enum: {
                values: ['pending', 'success', 'failed'],
                message: 'Invalid transaction status'
            },
            default: 'pending'
        },
        message: {
            type: String,
            required: function () {
                return this.status === "failed";
            }
        }
    },
    { timestamps: true })


export const Transaction = mongoose.model('Transaction', transactionSchema);