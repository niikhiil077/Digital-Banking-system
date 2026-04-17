import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../features/userdata";

export const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken:(state,action)=>{
        state.accessToken = action.payload;
    }
  },
});

export const {setAccessToken} = authSlice.actions;

export default authSlice.reducers;
