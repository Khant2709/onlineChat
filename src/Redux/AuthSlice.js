import React from "react";
import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: {
            name: null,
            email: null,
        },
    },
    reducers: {
        updateCurrentUser: (state, action) => {
            state.currentUser = {
                name: action.payload.name,
                email: action.payload.email,
            }
        },
    }
})

export const {updateCurrentUser} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;