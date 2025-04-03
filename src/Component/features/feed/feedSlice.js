import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers:{
        addFeed : (state,action) => {
            state.value = action.payload;
        },
        removeParticularFeed : (state,action ) => {
            const newArr = state.value.filter((user) => {
                return user._id !== action.payload;
            })
            state.value = newArr;
        },
        removeFeed : (state,action) => {
            state.value = null;
        }
    }
});

export const {addFeed,removeFeed,removeParticularFeed} = feedSlice.actions;
export default feedSlice.reducer;
