import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const NavbarContainer = () => {

    const chatsList = useSelector(state => state.users.chatsList);
    const usersList = useSelector(state => state.users.usersList);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);

    const [chats, setChats] = useState([]);
    const [searchText, setSearchText] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        //Проверяем на приватные переписки если есть проверяем доступ и отрисовываем
        let checkedChats = chatsList.filter(chat => {
            if (!!chat.privateChat) {
                return chat.privateChat.some(el => el === currentUserId)
            }
            return true;
        })
        //Отображаем имя собеседника переписки ввиде имени чата
        setChats(checkedChats.map(chat => {
            if(Array.isArray(chat.chatName)){
                return {...chat,
                    chatName: usersList.find(user => user.uid === chat.chatName.find(el => el !== currentUser.uid)).name}
            }
            return chat;
        }))

    }, [chatsList])

    const searchChat = chats.filter(chat => chat.chatName.toLowerCase().includes(searchText))

    return (
        <>
            <Navbar chatsList={searchChat}
                    navigate={navigate}
                    searchText={searchText}
                    setSearchText={setSearchText}
            />
        </>
    );
};

export default NavbarContainer;