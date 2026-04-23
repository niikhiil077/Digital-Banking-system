import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    isLoggedIn:false
  },
  reducers: {
    setIsLoggedIn:(state,action)=>{
        state.isLoggedIn = action.payload;
    }
  },
});

export const {setIsLoggedIn} = authSlice.actions;

export default authSlice.reducer;
