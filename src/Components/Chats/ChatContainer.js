import React, {useEffect, useRef, useState} from 'react';
import classes from './Chat.module.css'
import {useLocation, useNavigate, useParams} from "react-router";
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

    const {updateUser, updateChat, actionsWithMessage, removal, newUpdateChat} = useDatabase();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);
    const usersList = useSelector(state => state.users.usersList);
    const chatsList = useSelector(state => state.users.chatsList);

    const [currentChat, setCurrentChat] = useState(null);
    const [chekSubscription, setChekSubscription] = useState();
    const [searchText, setSearchText] = useState('');


    const newMessageRef = useRef('');
    const navigate = useNavigate();
    const params = useParams();
    const nowUrl = Object.values(params).join();
    const location = useLocation();
    const usersInChat = usersList.filter(user => currentChat?.subscribers?.some(el => el === user.uid));
    const searchUser = usersInChat.length !== 0 && usersInChat.filter(user => user.name.toLowerCase().includes(searchText));
    const pathUrl = location.pathname.split('/').filter(el => el.length !== 0)

    const fieldList = [
        {
            typeTeg: 'input',
            type: 'text',
            name: 'name',
            nameRu: 'Имя чата',
            value: pathUrl?.some(el => el === 'create') ? null : currentChat?.chatName,
            required: 'Поле обязательное для заполнения',
            minLength: {
                value: 2,
                message: 'Минимально 2 символов'
            },
        },
        {
            typeTeg: 'textarea',
            type: 'text',
            name: 'about',
            nameRu: 'Описание чата',
            value: pathUrl?.some(el => el === 'create') ? null : currentChat?.chatAbout,
            required: 'Поле обязательное для заполнения',
            minLength: {
                value: 10,
                message: 'Минимально 10 символов'
            },
            maxLength: {
                value: 100,
                message: 'Максимально 100 символов'
            },
        },
    ]

    //Проверка подписки пользователя на чат
    useEffect(() => {
        !!currentUser && setChekSubscription(currentChat?.subscribers?.some(el => el === currentUserId))
    }, [currentChat, nowUrl])

    //Отрисовка текущего чата
    useEffect(() => {
        setCurrentChat(chatsList.find(chat => chat.chatId === nowUrl))
    }, [chatsList, nowUrl])

    //Автоскроллин к концу чата
    useEffect(() => {
        currentChat && currentChat?.messages && newMessageRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, [currentChat])

    //Создание нового чата
    const createChat = (data) => {
        const chatCredential = {
            chatName: data.name,
            chatAbout: data.about,
            chatId: getId(),
            chatAdmin: currentUserId,
            subscribers: [currentUserId],
            messages: [],
        };
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
        const updates = {};
        updates[`allChats/${currentChat.chatId}/subscribers`] = currentChat.subscribers ? [...currentChat.subscribers, currentUserId] : [currentUserId]
        newUpdateChat(updates)

        updateUser({
            ...currentUser,
            subscription: currentUser.subscription ? [...currentUser.subscription, nowUrl] : [nowUrl]
        })
    }

    //Отписка от чата
    const unsubscribe = () => {
        const updates = {};
        updates[`allChats/${currentChat.chatId}/subscribers`] = currentChat.subscribers.filter(el => el !== currentUserId)
        newUpdateChat(updates)
    }

    //Изменения информации чата
    const changeInformationChat = (currentChat, data) => {
        const updates = {};
        updates[`allChats/${currentChat.chatId}/chatName`] = data.name;
        updates[`allChats/${currentChat.chatId}/chatAbout`] = data.about;
        newUpdateChat(updates);
        comeBack(`/chat/${currentChat.chatId}`)
    }

    const comeBack = (pathToChat) => {
        navigate(pathToChat)
    }

    //Отправка сообщения в чат
    const sendMessage = (messageText) => {
        const time = Date.now();
        const messageCredential = {
            readUser: [currentUserId],
            uid: currentUserId,
            message: messageText,
            time: time
        }
        actionsWithMessage(currentChat.chatId, time, messageCredential)
    }

    const changeMessage = (updateMessage, newText) => {
        actionsWithMessage(currentChat.chatId, updateMessage.time, {...updateMessage, message: newText})
    }

    return (
        <div className={classes.chatContainer}>
            {pathUrl.some(el => el === 'create' || el === 'edit')
                ? <ChatCreate createChat={createChat}
                              fieldList={fieldList}
                              pathUrl={pathUrl}
                              chatsList={chatsList}
                              changeInformationChat={changeInformationChat}
                              comeBack={comeBack}/>
                : <Chat currentChat={currentChat}
                        sendMessage={sendMessage}
                        usersList={usersList}
                        usersInChat={searchUser}
                        currentUserId={currentUserId}
                        chekSubscription={chekSubscription}
                        subscribe={subscribe}
                        navigate={navigate}
                        newMessageRef={newMessageRef}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        removal={removal}
                        changeMessage={changeMessage}
                        unsubscribe={unsubscribe}
                />
            }
        </div>
    );
};

export default ChatContainer;