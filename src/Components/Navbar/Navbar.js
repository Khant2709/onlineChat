import React from 'react';
import classes from './Navbar.module.css'
import {useNavigate} from "react-router";


const Navbar = (props) => {

    const navigate = useNavigate();

    return (
        <div  className={'navbar'}>
            <div className={classes.createChat}>
                <button onClick={() => navigate('/chat/create')}>Создать новый чат</button>
            </div>
            <div  className={classes.searchChat}>
                <span>Найти чат:</span>
                <input placeholder={'search'}   className={classes.searcher}/>
            </div>
            <div className={classes.chatsList}>
                {props.chatsList.map(chat => {
                    return <div key={chat.chatId}  className={classes.chat}
                                onClick={() => navigate(`/chat/${chat.chatId}`)}>
                        {chat.chatName}
                    </div>
                })}
            </div>
        </div>
    );
};

export default Navbar;