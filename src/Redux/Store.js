import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";


export default configureStore({
    reducer: {
        auth: AuthReducer,
    }
})