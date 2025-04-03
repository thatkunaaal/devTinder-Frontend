import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
}

const connectionSlice = createSlice({
    name: "connection",
    initialState ,
    reducers: {
        addConnections: (state,action) => {
            state.value = action.payload;
        },
        removeConnections : (state,action) => {
            state.value = null;
        }
    }
})

export const {addConnections ,removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;