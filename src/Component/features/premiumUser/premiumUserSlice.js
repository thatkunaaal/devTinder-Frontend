import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : false
}

const premiumUserSlice = createSlice({
    name: 'premiumUser',
    initialState ,
    reducers : {
        'makePremiumUser' : (state,action) => {
            state.value = true;
        },
        'removePremium' : (state) => {
            state.value = false;
        }
    }
})


export const {makePremiumUser,removePremium} = premiumUserSlice.actions;
export default premiumUserSlice.reducer;