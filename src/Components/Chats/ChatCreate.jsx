import React from 'react';
import classes from './ChatCreate.module.css'
import FormToChat from "./FormToChat";


const ChatCreate = (props) => {

    const currentChat = props.chatsList.find(chat => chat.chatId === props.pathUrl[2]);

    const actionWithChat = (data) => {
        props.pathUrl.some(el => el === 'create')
            ? props.createChat(data)
            : props.changeInformationChat(currentChat ,data)
    }

    return (
        <div  className={classes.chatCreate}>
            <div className={classes.chatCreateTitle}>
                {props.pathUrl.some(el => el === 'create') ? 'Создание нового чата' : currentChat?.chatName}
            </div>
            <FormToChat fieldList={props.fieldList} actionWithChat={actionWithChat}/>
        </div>
    );
};

export default ChatCreate;