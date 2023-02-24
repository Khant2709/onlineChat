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
            pattern: null,
            max: null,
            min: null,
            disabled: false,
        },
        {
            type: 'email',
            name: 'email',
            value: currentUser?.email,
            required: null,
            minLength: null,
            pattern: {
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: 'Введите корректно свой имаил',
            },
            max: null,
            min: null,
            disabled: false,
        },
        {
            type: 'number',
            name: 'age',
            value: currentUser?.age,
            required: null,
            minLength: null,
            pattern: null,
            max: {
                value: 99,
                message: 'Минимальный возраст 99'
            },
            min: {
                value: 18,
                message: 'Минимальный возраст 18'
            },
            disabled: false,
        },
        {
            type: 'tel',
            name: 'phone',
            value: currentUser?.phone,
            required: null,
            minLength: {
                value: 11,
                message: 'Минимально 11 символов'
            },
            pattern: null,
            max: null,
            min: null,
            disabled: false,
        },
        {
            type: 'text',
            name: 'country',
            value: currentUser?.country,
            required: null,
            minLength: {
                value: 2,
                message: 'Минимально 2 символов'
            },
            pattern: null,
            max: null,
            min: null,
            disabled: false,
        },
        {
            type: 'text',
            name: 'status',
            value: currentUser?.status,
            required: null,
            minLength: {
                value: 1,
                message: 'Минимально 1 символов'
            },
            pattern: null,
            max: null,
            min: null,
            disabled: false,
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
        const chatCredential = {
            chatName: [currentUserId, userId],
            chatId: getId(),
            chatAdmin: currentUserId,
            subscribers: [currentUserId, userId],
            privateChat: [currentUserId, userId]
        };
        updateChat(chatCredential)
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