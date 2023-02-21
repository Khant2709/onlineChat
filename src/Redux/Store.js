import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import UsersReducer from "./UsersSlice";


export default configureStore({
    reducer: {
        auth: AuthReducer,
        users: UsersReducer,
    }
})