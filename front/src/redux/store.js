import { configureStore } from "@reduxjs/toolkit";
import allContentSlice from "./allContentSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        allcontent: allContentSlice

    }
})