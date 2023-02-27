import React, {useEffect, useState} from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import Form from "./Form";
import classes from './Auth.module.css';
import classButton from '../CssModules/Button.module.css';
import {useSelector} from "react-redux";

const Login = (props) => {

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
            pattern: {
                value: /^([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+\.)*[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+([\p{L}\p{N}\-]+\.?){1,}[a-zA-Z]{2,}$/u,
                message: 'Введите корректно свой имаил',
            },
        },
        {
            type: 'password',
            name: 'password',
        },
    ]

    useEffect(() => {
        currentUserId && props.setShow(true);
        currentUserId && navigate(`/profile/${currentUserId}`);
    }, [currentUserId])


    const logIn = (data) => {
        login(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(`/profile/${user.uid}`);
                // console.log('5555', user)
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
                    <div className={classes.title}>
                        Востановление пароля
                    </div>
                    <div className={classes.item}>
                        <input type={'email'}
                               placeholder={'Введите ваш email'}
                               value={text}
                               className={classes.inp}
                               onChange={(e) => {
                                   setText(e.target.value)
                               }}/>
                        <button onClick={() => forget(text)} className={classButton.button}>Забыл пароль</button>
                        <div onClick={() => setShow(false)} className={classes.forget}>Я помню</div>
                    </div>
                </>

                : <>
                    <div className={classes.title}>
                        Авторизация
                    </div>
                    <Form login={logIn} fieldList={fieldList} error={error}/>
                    <div onClick={() => setShow(true)} className={classes.forget}>Забыл пароль?</div>
                    <NavLink to={'/registration'}>
                        <button className={classButton.button}>Зарегистрироваться</button>
                    </NavLink>
                </>
            }
        </div>
    );
};

export default Login;