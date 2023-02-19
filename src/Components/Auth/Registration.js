import React, {useEffect, useState} from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";
import {useDispatch} from "react-redux";
import {updateCurrentUser} from "../../Redux/AuthSlice";

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const {data, login} = useAuth();
    const {addUser} = useDatabase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logIn = () => {
            login(email, password);
    }

    useEffect(() => {
        if(data){
            addUser(data.id, name, data.email);
            localStorage.setItem('uid', data.id);
            dispatch(updateCurrentUser({name: name,  email: data.email}))
            navigate('/profile');
        }
    },[data])

    const cancel = () => {
        navigate('/')
    }

    return (
        <div>
            <div>
                <input type='text'
                       placeholder={'name'}
                       value={name}
                       onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <div>
                <input type='email'
                       placeholder={'email'}
                       value={email} onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div>
                <input type={'password'}
                       placeholder={'password'}
                       value={password} onChange={(e) => {setPassword(e.target.value)}}
                />
            </div>
            <div>
                <input type={'password'}
                       placeholder={'password'}
                       value={repeatPassword} onChange={(e) => {setRepeatPassword(e.target.value)}}/>
            </div>
            <div>
                <button onClick={logIn}>Регистрация</button>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
};

export default Registration;