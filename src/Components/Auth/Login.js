import React, {useEffect, useState} from 'react';
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {updateCurrentUser} from "../../Redux/AuthSlice";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";
import {useDispatch} from "react-redux";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {data, author} = useAuth();
    const {user, getUser} = useDatabase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = () => {
        author(email, password)
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem('uid', data.id);
            getUser(data.id)
        }
    }, [data])

    useEffect(() => {
        if (user) {
            console.log({user})
            dispatch(updateCurrentUser({name: user.username, email: user.email}))
            navigate('/profile');
        }
    }, [user])

    return (
        <div>
            <div>
                <input type='email' placeholder={'email'} value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            </div>
            <div>
                <input type={'password'} placeholder={'password'} value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>
            <div>
                <button onClick={login}>auth</button>
            </div>
            <NavLink to={'/registration'}>registration</NavLink>
        </div>
    );
};

export default Registration;