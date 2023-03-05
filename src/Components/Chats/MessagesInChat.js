import React, {useState} from 'react';
import classes from "./Chat.module.css";
import iconPencil from "../../image/free-icon-pencil-7585561.png";
import iconDelete from "../../image/free-icon-delete-3356414.png";
import moment from 'moment/min/moment-with-locales';
moment.locale('ru')

const settingCalendar = {
    lastDay: '[вчера в] LT',
    sameDay: '[сегодня в] LT',
    lastWeek: 'dddd [] LT',
    sameElse: 'L'
}

const MessagesInChat = (props) => {

    const [isEditMessage, setIsEditMessage] = useState(false);
    const [editMessageText, setEditMessageText] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

    const editMessage = (message) => {
        setIsEditMessage(!isEditMessage);
        setEditMessageText(message.message);
        setCurrentMessage(message.time);
    }

    const changeMessage = (message) => {
        setIsEditMessage(false);
        props.changeMessage(message, editMessageText)
    }

    return (
        <div className={classes.chat}>

            {Object.values(props.currentChat.messages).map((message) => {

                const date = moment(message.time).calendar(null,settingCalendar);
                const messageOwner = props.usersList.find(user => user.uid === message.uid)

                return <div key={message.time}
                            className={message.uid === props.currentUserId ? classes.message + ' ' + classes.myMessage : classes.message}>

                    <div className={classes.messageHeader}>
                        <span className={classes.messageOwner}>{messageOwner.name}</span>

                        {message.uid === props.currentUserId
                        && <div>
                            <img alt={'no img'} src={iconPencil}
                                 onClick={() => editMessage(message)}/>
                            <img alt={'no img'} src={iconDelete}
                                 onClick={() => props.removal(`allChats/${props.currentChat.chatId}/messages/${message.time}`)}/>
                        </div>}
                    </div>

                    {isEditMessage && currentMessage === message.time
                        ? <div className={classes.isEditMessage}>
                            <textarea value={editMessageText}
                                      onChange={(e) => {setEditMessageText(e.target.value)}}
                            />
                            <button disabled={editMessageText.trim().length < 2}
                                    onClick={() => changeMessage(message)}>Сохранить
                            </button>
                        </div>
                        : <span className={classes.messageText}>{message.message}</span>
                    }

                    <span className={classes.messageDate} ref={props.newMessageRef}>{date}</span>
                </div>
            })}

        </div>
    );
};

export default MessagesInChat;