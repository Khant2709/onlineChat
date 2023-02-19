import React, {createContext, useContext, useState} from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {firebaseConfig} from "./Firebase";


const MyContext = createContext({});

const app = initializeApp(firebaseConfig);

const FirebaseDatabaseProvider = (props) => {

    const db = getDatabase(app);
    const [user, setUser] = useState(null);

    const addUser = (userId, name, email) => {
        set(ref(db, 'allUsers/' + userId), {
            userId: userId,
            username: name,
            email: email,
        });
    }

    const getUser = (userId) => {
        const starCountRef = ref(db, 'allUsers/' + userId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log("data",data)
            setUser(data);
        });
    }

    return (
        <MyContext.Provider
            value={{addUser, getUser, user}}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;