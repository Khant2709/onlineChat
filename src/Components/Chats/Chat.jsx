import React, {useState} from 'react';
import classes from './Chat.module.css'
import iconSetting from "../../image/icon-setting.png";
import iconDelete from "../../image/free-icon-delete-3356414.png";
import iconPencil from "../../image/free-icon-pencil-7585561.png";
import classButton from "../CssModules/Button.module.css";
import InputEmoji from "react-input-emoji";
import MenuSettings from "./MenuSettings";
import MenuUsersInChat from "./MenuUsersInChat";

const Chat = (props) => {

    const [messageText, setMessageText] = useState('');
    const [showMenuSetting, setShowMenuSetting] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const sendMessage = () => {
        props.sendMessage(messageText)
        setMessageText('');
    }

    const visibilitySettingMenu = () => {
        if(!showUsers && !showMenuSetting){
            setShowMenuSetting(true);
        } else {
            setShowUsers(false);
            setShowMenuSetting(false);
        }
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
                        <div className={classes.chatHeaderInfo} onClick={visibilitySettingMenu}>
                            <img alt={'no img'} src={iconSetting}/>
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

                                        {Object.values(props.currentChat.messages).map((message) => {
                                            const date = new Date(message.time);
                                            let messageOwner = props.usersList.find(user => user.uid === message.uid)
                                            return <div key={message.time} className={message.uid === props.currentUserId
                                                ? classes.message + ' ' + classes.myMessage : classes.message}>
                                                <div className={classes.messageHeader}>
                                                    <span className={classes.messageOwner}>{messageOwner.name}</span>
                                                    <div >
                                                        <img alt={'no img'} src={iconPencil}/>
                                                        <img alt={'no img'} src={iconDelete}
                                                             onClick={() => message.uid === props.currentUserId && props.removeMessage(props.currentChat.chatId, message.time)}
                                                        />
                                                    </div>
                                                </div>
                                                <span className={classes.messageText}>{message.message}</span>
                                                <span className={classes.messageDate} ref={props.newMessageRef}>
                                                    {date ? date.toLocaleTimeString() : '*:*'}</span>
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

                {showMenuSetting && <MenuSettings
                    setShowUsers={setShowUsers}
                    setShowMenuSetting={setShowMenuSetting}
                />}

                {showUsers && <MenuUsersInChat
                    searchText={props.searchText}
                    usersInChat={props.usersInChat}
                    navigate={props.navigate}
                    setSearchText={props.setSearchText}
                    setShowUsers={setShowUsers}
                    setShowMenuSetting={setShowMenuSetting}
                />}
            </div>

            <div className={classes.chatFooter}>
                <InputEmoji
                    borderRadius={10}
                    placeholder={'Введите сообщение'}
                    value={messageText}
                    theme={'dark'}
                    onChange={setMessageText}
                    cleanOnEnter
                    onEnter={sendMessage}
                    disabled={!props.chekSubscription}
                />
                <button disabled={messageText.trim().length < 2}
                        onClick={sendMessage}
                        className={classButton.button}
                >Отправить
                </button>
            </div>
        </div>
    );
};

export default Chat;