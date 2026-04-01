import mongoose from "mongoose";
import { generateRandomUPI } from "../utils/Application-utilities/bank.utils.js";

const cardSchema = new mongoose.Schema(
    {
        cardHolderUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User id is must to create a debit card']
        },
        cardNo: {
            type: String,
            required: [true, 'Card number is not defined']
        },
        UPIid: {
            type: String,
            required: [true, 'UPI id is mandatory'],
            default: generateRandomUPI
        },
        accountLinked: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank',
            required: [true, 'Account must be provided by which the card used to be linked']
        },
        cardHolderName: {
            type: String,
            required: [true, 'Card owner name is not defined']
        },
        exp: {
            type: Date,
            required: [true, 'Card exp must be provided']
        },
        cvv: {
            type: Number,
            required: [true, 'Card cvv is not defined']
        },
        status: {
            type: String,
            enum: {
                values: ['InActive', 'Active', 'Blocked'],
                message: 'Card status is not defined'
            },
            default: 'InActive'
        },
        pin: {
            type: Number,
            default: null
        }
    }
    , { timestamps: true });

export const Card = mongoose.model('Card', cardSchema);