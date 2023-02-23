import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";

const NavbarContainer = () => {

    const chatsList = useSelector(state => state.users.chatsList);
    const usersList = useSelector(state => state.users.usersList);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = usersList.find(user => user.uid === currentUserId);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(chatsList.filter(chat => {
            if (!!chat.privateChat) {
                return chat.privateChat.some(el => el === currentUserId)
            }
            return true;
        }))
    }, [chatsList])
    // console.log('chats', chats)

    return (
        <>
            <Navbar chatsList={chats} currentUser={currentUser} usersList={usersList}/>
        </>
    );
};

export default NavbarContainer;