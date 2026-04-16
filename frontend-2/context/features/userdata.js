import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        personalDetails: {},
        bankDetails: {},
        accessToken: null
    },
    reducers: {
        setPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
        setBankDetails: (state, action) => {
            state.bankDetails = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    }
})

export const {setPersonalDetails , setBankDetails, setAccessToken} = userDataSlice.actions;

export default userDataSlice.reducer;