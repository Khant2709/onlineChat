import React from 'react';
import classes from "./Chat.module.css";
import iconSetting from "../../image/icon-setting.png";

const ChatHeader = (props) => {
    return (
        <>
            <div className={classes.chatHeaderName}>
                {Array.isArray(props.currentChat.chatName)
                    ? props.usersList.find(user => user.uid === props.currentChat.chatName.find(el => el !== props.currentUserId)).name
                    : props.currentChat.chatName
                }
            </div>
            <div className={classes.chatHeaderInfo} onClick={props.visibilitySettingMenu}>
                <img alt={'no img'} src={iconSetting}/>
            </div>
        </>
    );
};

export default ChatHeader;