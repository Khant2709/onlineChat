import React from "react";
import {createSlice} from "@reduxjs/toolkit";


export const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
    },
    reducers: {
        updateUsersList: (state, action) => {
            // console.log('action', action.payload)
            state.usersList = action.payload
        },
    }
})

export const {updateUsersList} = UsersSlice.actions;

const UsersReducer = UsersSlice.reducer;
export default UsersReducer;