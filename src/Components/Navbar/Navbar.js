import React from 'react';
import classes from './Navbar.module.css'


const Navbar = (props) => {

    return (
        <div className={'navbar'}>
            <div className={classes.createChat}>
                <button onClick={() => props.navigate('/chat/create')}>Создать новый чат</button>
            </div>

            <div className={classes.searchChat}>
                <span>Найти чат:</span>
                <input placeholder={'search'}
                       className={classes.searcher}
                       value={props.searchText}
                       onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>

            <div className={classes.chatsList}>
                {props.chatsList.map(chat => {
                    return <div key={chat.chatId} className={classes.chat}
                                onClick={() => props.navigate(`/chat/${chat.chatId}`)}>
                        {chat.chatName}
                    </div>
                })}
            </div>
        </div>
    );
};

export default Navbar;