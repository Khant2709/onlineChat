import React, {createContext, useContext, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database";
import {firebaseConfig} from "./Firebase";
import {updateCurrentUser} from "../Redux/AuthSlice";
import {useDispatch, useSelector} from "react-redux";
import {updateUsersList} from "../Redux/UsersSlice";


const MyContext = createContext({});
const app = initializeApp(firebaseConfig);

const FirebaseDatabaseProvider = (props) => {

    const db = getDatabase(app);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const dispatch = useDispatch();

    //Добавление в реалтайм базу в директорию allUsers пользователя
    const addUser = (userId, name, email) => {
        set(ref(db, 'allUsers/' + userId), {
            uid: userId,
            name: name,
            email: email,
        });
    }

    const updateUser = ({...user}) => {
         set(ref(db, 'allUsers/' + user.uid), {
            ...user
        })
    }

    //Сделать Подписку на изменение пользователя
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

    useEffect(() => {
        currentUserId && getUser(currentUserId)
            .then((data) => {
                console.log('0000', data);
                dispatch(updateCurrentUser({...data}))
            })
    }, [currentUserId])

    useEffect(() => {
        const starCountRef = ref(db, 'allUsers');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log("TEST+++", Object.values(data))
            dispatch(updateUsersList(Object.values(data)))
        })
    },[])

    return (
        <MyContext.Provider
            value={{addUser, getUser, updateUser}}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;