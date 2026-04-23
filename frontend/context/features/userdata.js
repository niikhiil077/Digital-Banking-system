import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        balance:null
    },
    reducers: {
        setBalance:(state,action)=>{
            state.balance = action.payload;
        }
    }
})

export const {setBalance} = userDataSlice.actions;

export default userDataSlice.reducer;