import React from 'react';
import classes from "./Navbar.module.css";
import imageChat from "../../image/free-icon-group-745205.png";

const NavbarChatsList = (props) => {

    return (
        <div className={classes.chatsList}>
            {props.chatsList.map(chat => {
                let arrayMessages = chat?.messages && Object.values(chat?.messages);
                let dontReadingMessages = chat.messages && arrayMessages.filter(message =>
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
                            <p>{chat.messages && arrayMessages.length !== 0 &&
                            arrayMessages[arrayMessages.length - 1].message}</p>
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
    );
};

export default NavbarChatsList;