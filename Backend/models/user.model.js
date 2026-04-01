import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { Card } from "./card.model.js";
import { Bank } from "./bank.model.js";



const addressSchema = mongoose.Schema({
    houseNo: {
        type: String,
        required: [true, 'House number is required']
    },
    streetAddress: {
        type: String,
        required: [true, 'Street Address is required']
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    state: {
        type: String,
        required: [true, 'state is required']
    },
    country: {
        type: String,
        required: [true, 'country is required']
    },
    pinCode: {
        type: String,
        required: [true, 'Pincode is mandatory']
    }
})

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Account holder Name is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        dob: {
            type: Date,
            required: [true, 'DOB is required'],
            validate: {
                validator: function (value) {
                    return value <= Date.now();
                },
                message: 'Dob cannot be in future'
            }
        },
        mobileNo: {
            type: String,
            required: [true, 'Mobile number is required']
        },
        aadharNo: {
            type: String,
            required: [true, 'Aadhar number is mandatory'],
            match: [/^\d{12}$/, 'Invalid Aadhaar number (not 12 digits)']
        },
        email: {
            type: String,
            match: [/.+@.+\..+/, "Invalid email"]
        },
        address: addressSchema,
        branch: {
            type: String
        },
        accType: {
            type: String,
            required: [true, 'Account type is mandatory'],
            enum: {
                values: ['student', 'saving', 'current', 'salary'],
                message: 'Invalid account type'
            }
        },
        guardianRelation: {
            type: String,
            enum: ['father', 'mother', 'brother', 'sister', 'other'],
            required: function () {
                const todayDate = new Date();
                const dobDate = this.dob;
                return todayDate.getFullYear() - dobDate.getFullYear() < 18
            }
        },
        guardianName: {
            type: String,
            required: function () {
                const todayDate = new Date();
                const dobDate = this.dob;
                return todayDate.getFullYear() - dobDate.getFullYear() < 18
            }
        },
        refreshToken: {
            type: String
        }


    },
    { timestamps: true })

userSchema.pre('save', async function () {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12)
        }
    } catch (error) {
        next(error);
    }
})

userSchema.pre('deleteOne', async function () {

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await Card.findOneAndDelete({ cardHolderUserId: this._id }).session(session);
        await Bank.findOneAndDelete({ accountHolderId: this._id }).session(session);

        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }
})


export const User = mongoose.model('User', userSchema);