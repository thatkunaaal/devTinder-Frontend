import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../features/user/userSlice";
import feedReducer from  "../features/feed/feedSlice";
import connectionReducer from "../features/connections/connectionSlice";
import requestReducer from "../features/requests/requestSlice";
import premiumUserReducer from  "../features/premiumUser/premiumUserSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        requests: requestReducer,
        premiumUser: premiumUserReducer
    },
});

export default store;