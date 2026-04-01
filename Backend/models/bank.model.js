import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
    {
        accNo: {
            type: String,
            required: [true, 'Account number is mandatory'],
            unique: true
        },
        IFSCcode: {
            type: String,
            required: [true, 'IFSC Code is mandatory']
        },
        balance: {
            type: Number,
            default: 0,
            min:[0,'Balance cannot be negative']
        },
        accountHolderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Account holder Id is required']
        },
        accountStatus:{
            type:String,
            enum:{
                values:['Active','Blocked'],
                message:'Account status is inValid'
            },
            default:'Active'
        }
    },
    { timestamps: true })

export const Bank = mongoose.model('Bank', bankSchema);