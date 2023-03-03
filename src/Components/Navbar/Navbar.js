import React from 'react';
import imageChat from '../../image/free-icon-group-745205.png'
import classes from './Navbar.module.css'
import classButton from "../CssModules/Button.module.css";


const Navbar = (props) => {

    return (
        <div className={'navbar'}>

            <div className={classes.searchChat}>
                <input placeholder={'Найти чат'}
                       className={classes.searcher}
                       value={props.searchText}
                       onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>

            <div className={classes.chatsList}>
                {props.chatsList.map(chat => {
                    let dontReadingMessages = chat.messages && chat.messages.filter(message =>
                        !message.readUser || message.readUser && message.readUser.every(el => el !== props.currentUserId)).length
                    return <div key={chat.chatId}
                                className={props.nowUrl === chat.chatId ? classes.chatActive : classes.chat}
                                onClick={() => props.readMessage(chat)}>
                        <div className={classes.chatImage}>
                            <img alt={'no image'} src={imageChat}/>
                        </div>
                        <div className={classes.chatInfo}>
                            <div className={classes.chatName}>
                                <p>{chat.chatName}</p>
                            </div>
                            <div className={classes.lastMessage}>
                                <p>{chat.messages && chat.messages.length !== 0 &&
                                chat.messages[chat.messages.length - 1].message}</p>
                            </div>
                        </div>
                        {!!dontReadingMessages && dontReadingMessages !== 0 &&
                        chat.subscribers.some(el => el === props.currentUserId) &&
                        <div className={classes.chatAlert}>
                            {dontReadingMessages}
                        </div>}
                    </div>
                })}
            </div>

            <div className={classes.createChat}>
                <button onClick={() => props.navigate('/chat/create')}
                        className={classButton.button}>Создать чат
                </button>
            </div>
        </div>
    );
};

export default Navbar;