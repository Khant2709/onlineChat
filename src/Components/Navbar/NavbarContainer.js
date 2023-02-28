import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";

const NavbarContainer = () => {

    const chatsList = useSelector(state => state.users.chatsList);
    const usersList = useSelector(state => state.users.usersList);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);
    const {updateChat} = useDatabase();


    const [chats, setChats] = useState([]);
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const nowUrl = location.pathname.split('/chat/')[1];

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
            if (Array.isArray(chat.chatName)) {
                return {
                    ...chat,
                    chatName: usersList.find(user => user.uid === chat.chatName.find(el => el !== currentUser.uid)).name
                }
            }
            return chat;
        }))

    }, [chatsList])

    const searchChat = chats.filter(chat => chat.chatName.toLowerCase().includes(searchText))

    const readMessage = (chat) => {
        const currentChat = chatsList.find(el => el.chatId === chat.chatId)
        chat.messages && updateChat({
            ...currentChat, messages: chat.messages.map(message => {
                return message.readUser
                    ? message.readUser.every(el => el !== currentUserId)
                        ? {...message, readUser: [...message.readUser, currentUserId]}
                        : message
                    : {...message, readUser: [currentUserId]}
            })
        })
        navigate(`/chat/${chat.chatId}`);
    }

    return (
        <>
            <Navbar chatsList={searchChat}
                    navigate={navigate}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    readMessage={readMessage}
                    currentUserId={currentUserId}
                    nowUrl={nowUrl}
            />
        </>
    );
};

export default NavbarContainer;