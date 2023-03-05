import React, {createContext, useContext, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue, remove, update, onDisconnect} from "firebase/database";
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

    const newUpdateUser = (updates) => {
        return update(ref(db), updates);

    }

    //Создание чата
    const updateChat = ({...chat}) => {
        return set(ref(db, 'allChats/' + chat.chatId), {
            ...chat
        })
    }

    const newUpdateChat = (updates) => {
        return update(ref(db), updates);
    }

    const actionsWithMessage = (chatId, messageId, messageCredential) => {
        return set(ref(db, `allChats/${chatId}/messages/${messageId}`), {
            ...messageCredential
        })
    }

    //Удаление сообщения из чата или чата (можно удалить все только сылку отправить)
    const removal = (pathToDelete) => {
        return remove(ref(db, pathToDelete))
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
            dispatch(updateChatsList(Object.values(data)))
        })
    }, [])

    useEffect(() => {
        dispatch(updateCurrentUser(usersList.find(user => user.uid === currentUserId)))
    }, [usersList, currentUserId])

    useEffect(() => {
        const previousUserId = localStorage.getItem('currentUserId');
        const currentUserRef = ref(db, `allUsers/${previousUserId}`)
        const updates = {};
        updates[`/isOnline`] = false;
        updates[`/lastTimeToVisit`] = Date.now();

        onDisconnect(currentUserRef).update(updates)
        if (currentUserId) {
            const updates = {};
            updates[`allUsers/${currentUserId}/isOnline`] = true;
            updates[`allUsers/${currentUserId}/lastTimeToVisit`] = null;
            newUpdateUser(updates)
        }
    }, [currentUserId])


    return (
        <MyContext.Provider
            value={{
                updateUser, newUpdateUser,
                updateChat, newUpdateChat,
                actionsWithMessage, removal
            }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useDatabase = () => useContext(MyContext);

export default FirebaseDatabaseProvider;