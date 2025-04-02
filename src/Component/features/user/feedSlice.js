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
        removeFeed : (state,action) => {
            state.value = null;
        }
    }
});

export const {addFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer;
