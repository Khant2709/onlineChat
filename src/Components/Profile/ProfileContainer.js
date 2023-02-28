import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Profile from "./Profile";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";
import {useNavigate, useParams} from "react-router";

const getId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const ProfileContainer = () => {

    const {updateUser, updateChat} = useDatabase();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);
    const usersList = useSelector(state => state.users.usersList);
    const chatsList = useSelector(state => state.users.chatsList);

    const [selectedUser, setSelectedUser] = useState(null);
    const [myProfile, setMyProfile] = useState(null);

    const navigate = useNavigate();
    const params = useParams();
    const nowUrl = Object.values(params).join();

    const fieldList = [
        {
            type: 'text',
            name: 'name',
            value: currentUser?.name,
            required: 'Поле обязательное для заполнения',
            minLength: {
                value: 2,
                message: 'Минимально 2 символов'
            },
        },
        {
            type: 'email',
            name: 'email',
            value: currentUser?.email,
        },
        {
            type: 'number',
            name: 'age',
            value: currentUser?.age,
            max: {
                value: 99,
                message: 'Минимальный возраст 99'
            },
            min: {
                value: 18,
                message: 'Минимальный возраст 18'
            },
        },
        {
            type: 'tel',
            name: 'phone',
            value: currentUser?.phone,
            minLength: {
                value: 11,
                message: 'Минимально 11 символов'
            },
        },
        {
            type: 'text',
            name: 'country',
            value: currentUser?.country,
            minLength: {
                value: 2,
                message: 'Минимально 2 символов'
            },
        },
        {
            type: 'text',
            name: 'status',
            value: currentUser?.status,
            minLength: {
                value: 1,
                message: 'Минимально 1 символов'
            },
        },
    ]

    useEffect(() => {
        nowUrl !== currentUserId
            ? setSelectedUser(usersList.find(user => user.uid === nowUrl))
            : setSelectedUser(null)
        nowUrl !== currentUserId ? setMyProfile(false) : setMyProfile(true)
    }, [usersList, nowUrl])

    const updateData = (userData) => {
        updateUser({
            ...userData, uid: currentUser.uid,
            subscription: currentUser.subscription ? currentUser.subscription : [],
            listMyChats: currentUser.listMyChats ? currentUser.listMyChats : []
        })
    }

    const createChat = (userId) => {
        const privatUsers = [currentUserId, userId];
        const chatCredential = {
            chatName: privatUsers,
            chatId: getId(),
            chatAdmin: currentUserId,
            subscribers: privatUsers,
            privateChat: privatUsers
        };

        let existsChat = chatsList.find(chat => {
            return Array.isArray(chat.chatName) && chat.chatName.every(element => privatUsers.some(el => el === element))
        })

        existsChat
            ? navigate(`/chat/${existsChat.chatId}`)
            : updateChat(chatCredential)
                .then(() => {
                    navigate(`/chat/${chatCredential.chatId}`)
                })
    }

    return (
        <>
            <Profile currentUser={!selectedUser ? currentUser : selectedUser}
                     fieldList={fieldList}
                     updateData={updateData}
                     myProfile={myProfile}
                     createChat={createChat}
            />
        </>
    );
};

export default ProfileContainer;