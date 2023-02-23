import React, {createContext, useContext, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue} from "firebase/database";
import {firebaseConfig} from "./Firebase";
import {useDispatch, useSelector} from "react-redux";
import {updateChatsList, updateUsersList} from "../Redux/UsersSlice";


const MyContext = createContext({});
const app = initializeApp(firebaseConfig);

const FirebaseDatabaseProvider = (props) => {

    const db = getDatabase(app);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const dispatch = useDispatch();

    //Создание или обновление пользователя
    const updateUser = ({...user}) => {
         return set(ref(db, 'allUsers/' + user.uid), {
            ...user
        })
    }

    //Сделать Подписку на изменение пользователя
    // const getUser = (userId) => {
    //     return new Promise((resolve, reject) => {
    //         const starCountRef = ref(db, 'allUsers/' + userId);
    //         onValue(starCountRef, (snapshot) => {
    //             const data = snapshot.val();
    //             console.log("data", data)
    //             resolve(data);
    //         });
    //     })
    // }

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

    return (
        <MyContext.Provider
            value={{updateUser,
                updateChat,
            }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;