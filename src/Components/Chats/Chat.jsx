import React, {useState} from 'react';
import classes from './Chat.module.css'
import image from "../../image/anonymity.png";
import classButton from "../CssModules/Button.module.css";

const Chat = (props) => {

    const [messageText, setMessageText] = useState('');
    const [showUsers, setShowUsers] = useState(false);

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
                            {Array.isArray(props.currentChat.chatName)
                                ? props.usersList.find(user => user.uid === props.currentChat.chatName.find(el => el !== props.currentUserId)).name
                                : props.currentChat.chatName
                            }
                        </div>
                        <div className={classes.chatHeaderInfo} onClick={() => setShowUsers(!showUsers)}>
                            Участников: {props.currentChat.subscribers.length}
                            <br/>
                            Онлайн:
                        </div>
                    </>
                    : <p>Идет загрузка...</p>
                }
            </div>

            <div className={classes.MainBlockChat}>
                <div className={classes.content}>
                    {props.chekSubscription || props.chekSubscription === undefined
                        ? <>
                            {props.currentChat
                                ? <>{props.currentChat.messages && props.currentChat?.messages?.length !== 0
                                    ? <div className={classes.chat}>
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
                                    </div>
                                    : <h2 style={{color: 'white', marginTop: '1em'}}>Пока нет сообщений</h2>
                                }</>
                                : <p>Идет загрузка...</p>
                            }
                        </>
                        : <div className={classes.chekSubscription}>
                            <span className={classes.chatCreateTitle}>Для входа нужно подписаться</span>
                            <button onClick={props.subscribe}
                                    className={classButton.button}>Подписаться
                            </button>
                        </div>
                    }

                </div>
                {showUsers && <div className={classes.usersChat}>
                    {props.usersInChat.map((user, index) => {
                        return <div className={classes.user}
                                    key={index}
                                    onClick={() => props.navigate(`/profile/${user.uid}`)}
                        >
                            <img alt={'No picture'} src={image}/>
                            <div className={classes.userCredential}>
                                <span>{user.name}</span><br/>
                                <span>{user.email}</span>
                            </div>
                        </div>
                    })}
                </div>
                }
            </div>

            <div className={classes.chatFooter}>
                <textarea placeholder={'Введите сообщение'}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          disabled={!props.chekSubscription}
                />
                <button disabled={messageText.trim().length < 2}
                        onClick={sendMessage}
                        className={classButton.button}
                >Send
                </button>
            </div>
        </div>
    );
};

export default Chat;