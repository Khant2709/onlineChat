import React from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";
import Form from "./Form";
import classes from './Auth.module.css'
import classButton from "../CssModules/Button.module.css";


const Registration = () => {

    const {create} = useAuth();
    const {updateUser} = useDatabase();
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
            pattern: {
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: 'Введите корректно свой имаил',
            },

        },
        {
            type: 'password',
            name: 'password',
        },
    ]

    const logIn = (data) => {
        create(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log('777', user)
                updateUser({uid: user.uid, name: data.name, email: user.email});
                navigate(`/profile/${user.uid}`);
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
        <div className={classes.loginBlock}>
            <div className={classes.title}>
                Регистрация
            </div>
            <Form login={logIn} fieldList={fieldList}/>
            <div>
                <button onClick={cancel} className={classButton.button}>Отмена</button>
            </div>
        </div>
    );
};

export default Registration;