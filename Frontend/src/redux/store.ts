import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import tasktypeReducer from "./tasktypeSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        task_type: tasktypeReducer
    }
})
export default store;
