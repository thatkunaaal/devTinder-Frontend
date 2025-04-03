import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null,
}

const requestSlice = createSlice({
    name : "requests",
    initialState,
    reducers : {
        addRequest : (state,action) => {
            state.value = action.payload;
        },
        removeParticularRequest : (state,action ) => {
            const id = action.payload;
            const newArr = state.value.filter((req)=>{
                return req._id != id;
            })
            state.value = newArr;
        },
        removeRequest : (state,action ) => {
            state.value = null;
        },
    }
})

export const {addRequest,removeRequest,removeParticularRequest} = requestSlice.actions;

export default requestSlice.reducer;