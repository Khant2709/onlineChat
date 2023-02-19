import React, {useState} from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import Form from "./Form";

const Registration = () => {

    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    const {login, forgetPassword} = useAuth();
    const navigate = useNavigate();

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

    const logIn = (data) => {
        login(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/profile');
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
        <div>
            <Form login={logIn} fieldList={fieldList} error={error}/>
            <NavLink to={'/registration'}>Зарегистрироваться</NavLink>
                <br/>
            <input type={'email'}
                   placeholder={'Введите ваш email'}
                   value={text}
                   onChange={(e) => {setText(e.target.value)}}/>
            <button onClick={() => forget(text)}>Забыл пароль</button>
        </div>
    );
};

export default Registration;