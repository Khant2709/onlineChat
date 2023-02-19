import React, {createContext, useContext} from 'react';
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database";
import {firebaseConfig} from "./Firebase";


const MyContext = createContext({});
const app = initializeApp(firebaseConfig);

const FirebaseDatabaseProvider = (props) => {

    const db = getDatabase(app);

    const addUser = (userId, name, email) => {
        set(ref(db, 'allUsers/' + userId), {
            userId: userId,
            username: name,
            email: email,
        });
    }

    const getUser = (userId) => {
        return new Promise((resolve, reject) => {
            const starCountRef = ref(db, 'allUsers/' + userId);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log("data", data)
                resolve(data);
            });
        })
    }

    return (
        <MyContext.Provider
            value={{addUser, getUser}}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;