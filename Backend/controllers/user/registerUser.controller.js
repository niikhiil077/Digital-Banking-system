import { User } from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../tokens/generateTokens.js";
import { apiResponse } from "../../utils/responseHandling-&-AsyncHandling/apiResponse.js";
import { asyncHandler } from "../../utils/responseHandling-&-AsyncHandling/asyncHandler.js";
import { errorResponse } from "../../utils/responseHandling-&-AsyncHandling/errorResponse.js";
import { check, validationResult } from "express-validator";
import crypto from 'crypto';
import { generateBankAccountNo, generateIFSCCode ,generateDebitCardDetails } from "../../utils/Application-utilities/bank.utils.js";
import { Bank } from "../../models/bank.model.js";

import { Card } from "../../models/card.model.js";


// Validating user middleware

export const validateInputsController = [

    // Name
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 40 }).withMessage('Name must be 3–40 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name can contain only letters and spaces'),

    // DOB
    check('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isISO8601().withMessage('DOB must be a valid date (YYYY-MM-DD)')
        .custom((value) => {
            const dob = new Date(value);
            if (dob > new Date()) throw new Error('DOB cannot be in the future');
            return true;
        }),

    // Mobile Number (India)
    check('mobileNo')
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^[6-9]\d{9}$/).withMessage('Enter valid 10-digit Indian mobile number'),

    // Aadhaar
    check('aadharNo')
        .notEmpty().withMessage('Aadhaar number is required')
        .matches(/^\d{12}$/).withMessage('Aadhaar must be exactly 12 digits'),

    // Email
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address')
        .normalizeEmail(),

    // Address Object
    check('address')
        .notEmpty().withMessage('Address is required')
        .isObject().withMessage('Address must be an object'),

    // Branch
    check('branch')
        .trim()
        .notEmpty().withMessage('Branch name is required')
        .isLength({ min: 2 }).withMessage('Branch name too short'),

    // Account Type
    check('accType')
        .notEmpty().withMessage('Account type is required')
        .isIn(['student', 'saving', 'current', 'salary'])
        .withMessage('Invalid account type'),

    // Guardian Relation (conditional)
    check('guardianRelation')
        .custom((value, { req }) => {
            const age = new Date().getFullYear() - new Date(req.body.dob).getFullYear();
            if (age < 18 && !value) {
                throw new Error('Guardian relation is required for minors');
            }
            return true;
        }),

    // Guardian Name (conditional)
    check('guardianName')
        .custom((value, { req }) => {
            const age = new Date().getFullYear() - new Date(req.body.dob).getFullYear();
            if (age < 18 && !value) {
                throw new Error('Guardian name is required for minors');
            }
            return true;
        }),

    // Password
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Password must include at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must include at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must include at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must include at least one special character'),

    // Confirm Password
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),


    async (req, res, next) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                code: 'Validation Errors',
                errorList: validationErrors.array()
            })
        }

        next();


    }]





// Registering User middleware

export const registerUserController = asyncHandler(async (req, res, next) => {

    const { name, dob, mobileNo, aadharNo, email, address, branch, accType, guardianRelation, guardianName, password, confirmPassword } = req.body;   


    const alreadyExistedUser = await User.findOne({ mobileNo: mobileNo });

    if (alreadyExistedUser) {
        return res.status(400).json(new apiResponse(400, 'Account Exists', 'User with this mobile number already exists'))
    }

    const userData = {
        name: name,
        password: password,
        dob: dob,
        mobileNo: mobileNo,
        aadharNo: aadharNo,
        email: email,
        address: address,
        branch: branch,
        accType: accType,
        guardianRelation: guardianRelation,
        guardianName: guardianName
    }


    const user = await User.create(userData);

    if (!user) {
        throw new errorResponse(500, 'Registration failed', 'Failure while saving user to db')
    }

    const refreshToken = await generateRefreshToken(user._id)
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    if (!refreshToken) {
        throw new errorResponse(500, 'RefreshToken Failure', 'Failure while generating refresh Token')
    }

    const UserRegistered = await User.findOneAndUpdate({
        _id: user._id
    }, {
        refreshToken: hashedRefreshToken
    })

    if (!UserRegistered) {
        throw new errorResponse(500, 'User seraching failed', 'cant find user to set refresh token')
    }

    const accessToken = await generateAccessToken(user._id)

    if (!accessToken) {
        throw new errorResponse(500, 'AccessToken Failure', 'Failed while genrating access token')
    }

    const accNo = generateBankAccountNo();
    const IFSCcode = generateIFSCCode();


    const accountCreated = await Bank.create({ accNo: accNo, IFSCcode: IFSCcode, balance: 0, accountHolderId: UserRegistered._id });

    if (!accountCreated) {
        throw new Error('Failure while creating bank account of user');
    }

    const cardDetails = generateDebitCardDetails();

    const card = await Card.create({
        cardHolderUserId: user._id,
        cardNo: cardDetails.cardNo,
        accountLinked: accountCreated._id,
        cardHolderName: name,
        exp: cardDetails.exp,
        cvv: cardDetails.cvv
    })

    if (!card) {
        throw new Error('Internal error while creating virtual debit card');
    }

    
    

    return res
        .status(201)
        .cookie("refresh_Token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(new apiResponse(200, 'Registered', 'User registered successfully and account has been created', {
            user: {
                userId: UserRegistered._id,
                name: UserRegistered.name,
                dob: UserRegistered.dob,
                mobileNo: UserRegistered.mobileNo,
                email: UserRegistered.email,
            },
            BankDetails: {
                bankId: accountCreated._id,
                accNo: accountCreated.accNo,
                accType: UserRegistered.accType,
                branch: UserRegistered.branch,
            },
            cardDetails: {
                cardNo: card.cardNo,
                exp: card.exp,
                cvv: card.cvv
            },
            accessToken: accessToken
        }))

})