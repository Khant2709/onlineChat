import React from "react";
import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: {},
        currentUserId: ''
    },
    reducers: {
        updateCurrentUser: (state, action) => {
            // console.log('action', action.payload)
            state.currentUser = {...action.payload}
        },
        updateUid: (state, action) => {
            state.currentUserId = action.payload
        }
    }
})

export const {updateCurrentUser, updateUid} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;