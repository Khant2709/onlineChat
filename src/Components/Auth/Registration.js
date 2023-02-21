import React from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";
import {useDispatch} from "react-redux";
import {updateCurrentUser} from "../../Redux/AuthSlice";
import Form from "./Form";

const Registration = () => {

    const {create} = useAuth();
    const {addUser} = useDatabase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fieldList = [
        {
            type: 'text',
            name: 'name',
            minLength: {
                value: 2,
                message: 'Минимально 2 символов'
            },
            pattern: null,
        },
        {
            type: 'email',
            name: 'email',
            minLength: null,
            pattern: {
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: 'Введите корректно свой имаил',
            },

        },
        {
            type: 'password',
            name: 'password',
            minLength: {
                value: 6,
                message: 'Минимально 6 символов'
            },
            pattern: null,

        },
    ]

    const logIn = (data) => {
        create(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log('777', user)
                addUser(user.uid, data.name, user.email);
                dispatch(updateCurrentUser({name: data.name, email: user.email}))
                navigate('/profile');
            })
            .catch((error) => {
                console.log('errorCode', error.code)
                console.log('errorMessage', error.message)
            });

    }

    const cancel = () => {
        navigate('/')
    }

    return (
        <div>
            <Form login={logIn} fieldList={fieldList}/>
            <div>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
};

export default Registration;