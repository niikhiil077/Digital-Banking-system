import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './features/userdata';
import authDataReducer from './authentication/authData';
import cardDataReducer from './features/carddata';
import beneficiaryReducer from './beneficiary/beneficiary';

export const store = configureStore({
    reducer: {
        userData : userDataReducer,
        authData: authDataReducer,
        cardData :cardDataReducer,
        beneficiaryData :beneficiaryReducer,
    }
});