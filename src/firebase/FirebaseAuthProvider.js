import React, {createContext, useContext, useEffect, useState} from 'react';
import {initializeApp} from "firebase/app";
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        sendPasswordResetEmail,
} from "firebase/auth";
import {firebaseConfig} from "./Firebase";


const MyContext = createContext({});

const app = initializeApp(firebaseConfig);


const FirebaseAuthProvider = (props) => {

    const auth = getAuth(app);
    const [currentUserId, setCurrentUserId] = useState(null);
    console.log('!!!999',auth.currentUser)


    const create = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const forgetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('finish')
            })
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('!!!user',user)
            setCurrentUserId(user ? user.uid : null);
        })
    },[])

    return (
        <MyContext.Provider
            value={{create, login, logout,
                currentUserId, forgetPassword
            }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useAuth = () => useContext(MyContext);

export default FirebaseAuthProvider;