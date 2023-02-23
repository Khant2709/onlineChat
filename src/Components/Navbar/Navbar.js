import React, {useEffect, useState} from 'react';
import classes from './Navbar.module.css'
import {useNavigate} from "react-router";


const Navbar = (props) => {

    const [chatsList, setChatList] = useState([])
    const [searchText, setSearchText] = useState('')
    const navigate = useNavigate();
    const searchChat = chatsList.filter(chat => chat.chatName.toLowerCase().includes(searchText))

    useEffect(() => {
        setChatList(props.chatsList.map(chat => {
            if(Array.isArray(chat.chatName)){
                return {...chat,
                    chatName: props.usersList.find(user => user.uid === chat.chatName.find(el => el !== props.currentUser.uid)).name}
            }
            return chat;
        }))
    }, [props.chatsList])

    return (
        <div className={'navbar'}>
            <div className={classes.createChat}>
                <button onClick={() => navigate('/chat/create')}>Создать новый чат</button>
            </div>

            <div className={classes.searchChat}>
                <span>Найти чат:</span>
                <input placeholder={'search'}
                       className={classes.searcher}
                       value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className={classes.chatsList}>
                {searchChat.map(chat => {
                    return <div key={chat.chatId} className={classes.chat}
                                onClick={() => navigate(`/chat/${chat.chatId}`)}>
                        {chat.chatName}
                    </div>
                })}
            </div>
        </div>
    );
};

export default Navbar;