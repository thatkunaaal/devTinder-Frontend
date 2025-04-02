import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../features/user/userSlice";
import feedReducer from  "../features/user/feedSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    },
});

export default store;