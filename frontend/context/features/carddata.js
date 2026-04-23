import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "CardData",
  initialState: {
    cardData: {},
  },
  reducers: {
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});


export const {setCardData} = cardSlice.actions;

export default cardSlice.reducer;