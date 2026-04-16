import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './features/userdata';

export const store = configureStore({
    reducer: {
        userData : userDataReducer,
    }
});