import React, {createContext, useContext, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import {firebaseConfig} from "./Firebase";
import {useDispatch} from "react-redux";
import {updateUid} from "../Redux/AuthSlice";


const MyContext = createContext({});

const app = initializeApp(firebaseConfig);


const FirebaseAuthProvider = (props) => {

    const auth = getAuth(app);
    // console.log('auth.currentUser = ', auth.currentUser);
    const dispatch = useDispatch();

    //Регистрация пользователя
    const create = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Вход существующего пользователя
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Востановление пароля
    const forgetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('finish')
            })
    }

    //Выход из профиля
    const logout = () => {
        return signOut(auth)
    }

    //Получение uid текущего профиля и установка в редьюсер
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log('Получение uid =', user)
            dispatch(updateUid(user ? user.uid : null));
            user && localStorage.setItem('currentUserId', user.uid)
        })
    }, [])

    return (
        <MyContext.Provider
            value={{
                create, login, logout, forgetPassword,
            }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useAuth = () => useContext(MyContext);

export default FirebaseAuthProvider;