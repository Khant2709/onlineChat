import React from "react";
import {createSlice} from "@reduxjs/toolkit";


export const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        chatsList: [],
    },
    reducers: {
        updateUsersList: (state, action) => {
            // console.log('action', action.payload)
            state.usersList = action.payload
        },
        updateChatsList: (state, action) => {
            // console.log('action', action.payload)
            state.chatsList = action.payload
        },
    }
})

export const {updateUsersList, updateChatsList} = UsersSlice.actions;

const UsersReducer = UsersSlice.reducer;
export default UsersReducer;