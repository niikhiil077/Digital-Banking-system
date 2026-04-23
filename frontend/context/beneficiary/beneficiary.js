import { createSlice } from "@reduxjs/toolkit";


export const BeneficiarySlice = createSlice({
    name:"beneficiaryList",
    initialState:{
        showBeneficiaries:false,
        beneficiaryList:[],
        payBeneficiary:false
    },
    reducers:{
     setShowBeneficiaries:(state,action)   =>{
        state.showBeneficiaries = action.payload;
     },
     setbeneficiaryList:(state,action)=>{
        state.beneficiaryList = action.payload;
     },
     setpayBeneficiary:(state,action)=>{
        state.payBeneficiary = action.payload;
     }
    }
})

export const {setShowBeneficiaries,setbeneficiaryList,setpayBeneficiary} = BeneficiarySlice.actions;

export default BeneficiarySlice.reducer;