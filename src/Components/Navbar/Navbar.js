import React from 'react';
import classes from './Navbar.module.css'
import classButton from "../CssModules/Button.module.css";


const Navbar = (props) => {

    return (
        <div className={'navbar'}>

            <div className={classes.searchChat}>
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

            <div className={classes.createChat}>
                <button onClick={() => props.navigate('/chat/create')}
                        className={classButton.button}>Создать новый чат</button>
            </div>
        </div>
    );
};

export default Navbar;