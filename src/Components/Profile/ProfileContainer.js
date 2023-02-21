import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Profile from "./Profile";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";


const ProfileContainer = () => {

    const {updateUser} = useDatabase();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const usersList = useSelector(state => state.users.usersList);
    const [currentUser, setCurrentUser] = useState(null)
    const fieldList = [
        {
            type: 'text',
            name: 'name',
            value: currentUser?.name,
            required: 'Поле обязательное для заполнения',
            minLength: {
                value: 6,
                message: 'Минимально 6 символов'
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
         setCurrentUser(usersList.find(user => user.uid === currentUserId))
    }, [usersList])

    const updateData = (userData) => {
        updateUser({...userData, uid: currentUserId})
    }

    return (
        <>
            <Profile currentUser={currentUser} fieldList={fieldList} updateData={updateData}/>
        </>
    );
};

export default ProfileContainer;