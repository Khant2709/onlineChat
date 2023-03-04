import React from 'react';
import classes from './ChatCreate.module.css'
import FormToChat from "./FormToChat";
import {useLocation} from "react-router";


const ChatCreate = (props) => {

    const location = useLocation();
    const currentChat = props.chatsList.find(chat => chat.chatId === props.pathUrl[2]);
    console.log(location.pathname)

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
            <FormToChat fieldList={props.fieldList}
                        actionWithChat={actionWithChat}
                        comeBack={props.comeBack}/>
        </div>
    );
};

export default ChatCreate;