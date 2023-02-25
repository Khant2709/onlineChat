import React, {useEffect, useState} from 'react';
import classes from './Chat.module.css'
import {useNavigate, useParams} from "react-router";
import ChatCreate from "./ChatCreate";
import Chat from "./Chat";
import {useSelector} from "react-redux";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";

const getId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const ChatContainer = () => {

    const {updateUser, updateChat} = useDatabase();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);
    const usersList = useSelector(state => state.users.usersList);
    const chatsList = useSelector(state => state.users.chatsList);

    const [currentChat, setCurrentChat] = useState(null);
    const [chekSubscription, setChekSubscription] = useState();

    const navigate = useNavigate();
    const params = useParams();
    const nowUrl = Object.values(params).join();
    const usersInChat = usersList.filter(user => currentChat?.subscribers?.some(el => el === user.uid))

    //Проверка подписки пользователя на чат
    useEffect(() => {
        !!currentUser && setChekSubscription(currentChat?.subscribers?.some(el => el === currentUserId))
    }, [currentChat, nowUrl])

    //Отрисовка текущего чата
    useEffect(() => {
        setCurrentChat(chatsList.find(chat => chat.chatId === nowUrl))
    }, [chatsList, nowUrl])

    //Создание нового чата
    const createChat = (name) => {
        const chatCredential = {
            chatName: name,
            chatId: getId(),
            chatAdmin: currentUserId,
            subscribers: [currentUserId]
        };
        // console.log(chatCredential)
        updateChat(chatCredential)
            .then(() => {
                updateUser({
                    ...currentUser,
                    subscription: currentUser.subscription ? [...currentUser.subscription, chatCredential.chatId] : [chatCredential.chatId],
                    listMyChats: currentUser.listMyChats ? [...currentUser.listMyChats, chatCredential.chatId] : [chatCredential.chatId]
                })
                    .then(() => {
                        navigate(`/chat/${chatCredential.chatId}`)
                    })
            })
    }

    //Подписка на чат
    const subscribe = () => {
        updateChat({
            ...currentChat,
            subscribers: currentChat.subscribers ? [...currentChat.subscribers, currentUserId] : [currentUserId]
        })
        updateUser({
            ...currentUser,
            subscription: currentUser.subscription ? [...currentUser.subscription, nowUrl] : [nowUrl]
        })
    }

    //Отправка сообщения в чат
    const sendMessage = (messageText) => {
        const messageCredential = {
            uid: currentUserId,
            message: messageText,
            time: Date.now()
        }
        updateChat({
            ...currentChat,
            messages: currentChat.messages ? [...currentChat.messages, messageCredential] : [messageCredential]
        })
    }

    return (
        <div className={classes.chatContainer}>
            {nowUrl === 'create'
                ? <ChatCreate createChat={createChat}/>
                : <Chat currentChat={currentChat}
                        sendMessage={sendMessage}
                        usersList={usersList}
                        usersInChat={usersInChat}
                        currentUserId={currentUserId}
                        chekSubscription={chekSubscription}
                        subscribe={subscribe}
                        navigate={navigate}
                />
            }
        </div>
    );
};

export default ChatContainer;