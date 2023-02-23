import React from "react";
import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: {
            name: null,
            email: null,
            age: null,
            phone: null,
            country: null,
            status: null,
        },
        currentUserId: null
    },
    reducers: {
        updateUid: (state, action) => {
            state.currentUserId = action.payload
        }
    }
})

export const {updateUid} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;