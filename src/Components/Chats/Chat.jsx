import React, {useState} from 'react';
import classes from './Chat.module.css'

const Chat = (props) => {

    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        props.sendMessage(messageText)
        setMessageText('');
    }

    return (
        <div className={classes.chatBlock}>

            <div className={classes.chatHeader}>
                {props.currentChat
                    ? <>
                        <div className={classes.chatHeaderName}>
                            {props.currentChat.chatName}
                        </div>
                        <div className={classes.chatHeaderInfo}>
                            Участников: {props.currentChat.subscribers.length}
                            <br/>
                            Онлайн:
                        </div>
                    </>
                    : <p>Идет загрузка...</p>
                }
            </div>

            <div className={classes.chat}>
                {props.chekSubscription
                    ? <>
                        {props.currentChat
                            ? <>{props.currentChat.messages && props.currentChat?.messages?.length !== 0
                                ? <>
                                    {props.currentChat.messages.map((message, index) => {
                                        const date = new Date(message.time);
                                        let messageOwner = props.usersList.find(user => user.uid === message.uid)
                                        return <div key={index}
                                                    className={message.uid === props.currentUserId ? classes.message + ' ' + classes.myMessage : classes.message}>
                                            <span className={classes.messageOwner}>{messageOwner.name}</span>
                                            <span className={classes.messageText}>{message.message}</span>
                                            <span
                                                className={classes.messageDate}>{date ? date.toLocaleTimeString() : '*:*'}</span>
                                        </div>

                                    })}
                                </>
                                : <h2>Пока нет сообщений</h2>
                            }</>
                            : <p>Идет загрузка...</p>
                        }
                    </>
                    : <div className={classes.chekSubscription}>
                        <span className={classes.chatCreateTitle}>Для входа нужно подписаться</span>
                        <button onClick={props.subscribe}>Подписаться</button>
                    </div>
                }
            </div>

            <div className={classes.chatFooter}>
                <textarea placeholder={'Введите сообщение'}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          disabled={!props.chekSubscription}
                />
                <button disabled={messageText.trim().length < 2} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;