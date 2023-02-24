import React, {useEffect, useState} from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import Form from "./Form";
import classes from './Auth.module.css'
import {useSelector} from "react-redux";

const Registration = () => {

    const {login, forgetPassword} = useAuth();
    const currentUserId = useSelector(state => state.auth.currentUserId);

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false)


    const fieldList = [
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

    useEffect(() => {
        currentUserId && navigate(`/profile/${currentUserId}`)
    },[currentUserId])


    const logIn = (data) => {
        login(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(`/profile/${user.uid}`);
                console.log('5555', user)
            })
            .catch((error) => {
                setError(true);
                console.error('errorCode', error.code)
                console.error('errorMessage', error.message)
            });
    }

    const forget = (email) => {
        forgetPassword(email)
    }

    return (
        <div className={classes.loginBlock}>
            {show
                ? <>
                    <label className={classes.label}>
                                Введите ваш пароль
                        <input type={'email'}
                               placeholder={'Введите ваш email'}
                               value={text}
                               className={classes.inp}
                               onChange={(e) => {
                                   setText(e.target.value)
                               }}/>
                    </label>
                    <button onClick={() => forget(text)} className={classes.btn}>Забыл пароль</button>
                    <div onClick={() => setShow(false)} className={classes.forget}>Я помню</div>
                </>
                : <>
                    <Form login={logIn} fieldList={fieldList} error={error}/>
                    <div onClick={() => setShow(true)} className={classes.forget}>Забыл пароль?</div>
                    <NavLink to={'/registration'}>
                        <button className={classes.btn}>Зарегистрироваться</button>
                    </NavLink>
                </>
            }
        </div>
    );
};

export default Registration;