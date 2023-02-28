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
                    let dontReadingMessages = chat.messages && chat.messages.filter(message =>
                        !message.readUser || message.readUser && message.readUser.every(el => el !== props.currentUserId)).length

                    return <div key={chat.chatId} className={classes.chat}
                                onClick={() => props.readMessage(chat)}>
                        <div className={classes.chatName}>
                            {chat.chatName}
                        </div>
                        {dontReadingMessages !== 0 &&
                        chat.subscribers.some(el => el === props.currentUserId) &&
                        <div className={classes.chatAlert}>
                            {dontReadingMessages}
                        </div>}
                    </div>
                })}
            </div>

            <div className={classes.createChat}>
                <button onClick={() => props.navigate('/chat/create')}
                        className={classButton.button}>Создать новый чат
                </button>
            </div>
        </div>
    );
};

export default Navbar;