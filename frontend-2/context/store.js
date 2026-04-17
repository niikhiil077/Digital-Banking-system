import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './features/userdata';
import authDataReducer from './authentication/authData'

export const store = configureStore({
    reducer: {
        userData : userDataReducer,
        authData: authDataReducer
    }
});