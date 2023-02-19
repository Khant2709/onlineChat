import React, {createContext, useContext, useEffect, useState} from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {firebaseConfig} from "./Firebase";


const MyContext = createContext({});

const app = initializeApp(firebaseConfig);


const FirebaseAuthProvider = (props) => {

    const auth = getAuth(app);
    const [data, setData] = useState(null);

    const login = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setData({id: user.uid, email: user.email})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode',errorCode )
                console.log('errorMessage', errorMessage)
            });
    }

    const author = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setData({id: user.uid, email: user.email})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode',errorCode )
                console.log('errorMessage', errorMessage)
            });
    }

    return (
        <MyContext.Provider
            value={{data, login, author}}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useAuth = () => useContext(MyContext);

export default FirebaseAuthProvider;