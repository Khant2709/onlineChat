import React, {createContext, useContext, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database";
import {firebaseConfig} from "./Firebase";
import {useDispatch, useSelector} from "react-redux";
import {updateChatsList, updateUsersList} from "../Redux/UsersSlice";
import {updateCurrentUser} from "../Redux/AuthSlice";


const MyContext = createContext({});
const app = initializeApp(firebaseConfig);

const FirebaseDatabaseProvider = (props) => {

    const db = getDatabase(app);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const usersList = useSelector(state => state.users.usersList);
    const dispatch = useDispatch();

    //Создание или обновление пользователя
    const updateUser = ({...user}) => {
         return set(ref(db, 'allUsers/' + user.uid), {
            ...user
        })
    }

    //Создание чата
    const updateChat = ({...chat}) => {
        return set(ref(db, 'allChats/' + chat.chatId), {
            ...chat
        })
    }

    useEffect(() => {
        const usersListRef = ref(db, 'allUsers');
        onValue(usersListRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(updateUsersList(Object.values(data)))
        })

        const chatsListRef = ref(db, 'allChats');
        onValue(chatsListRef, (snapshot) => {
            const data = snapshot.val();
            // console.log("chatList", data)
            dispatch(updateChatsList( Object.values(data)))
        })
    },[])

    useEffect(() => {
        dispatch(updateCurrentUser(usersList.find(user => user.uid === currentUserId)))
    },[usersList, currentUserId])

    return (
        <MyContext.Provider
            value={{updateUser, updateChat
            }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;