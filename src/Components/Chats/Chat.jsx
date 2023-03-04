import React, {useState} from 'react';
import classes from './Chat.module.css'
import classButton from "../CssModules/Button.module.css";
import MenuSettings from "./MenuSettings";
import MenuUsersInChat from "./MenuUsersInChat";
import MessagesInChat from "./MessagesInChat";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Preloader from "../Preloader/Preloader";

const Chat = (props) => {

    const [showMenuSetting, setShowMenuSetting] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const visibilitySettingMenu = () => {
        if (!showUsers && !showMenuSetting) {
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
                    ? <ChatHeader
                        currentChat={props.currentChat}
                        usersList={props.usersList}
                        currentUserId={props.currentUserId}
                        visibilitySettingMenu={visibilitySettingMenu}/>
                    : <Preloader/>
                }
            </div>

            <div className={classes.MainBlockChat}>
                <div className={classes.content}>
                    {props.chekSubscription || props.chekSubscription === undefined
                        ? <>
                            {props.currentChat
                                ? <>{props.currentChat.messages && props.currentChat?.messages?.length !== 0
                                    ? <MessagesInChat
                                        currentChat={props.currentChat}
                                        usersList={props.usersList}
                                        currentUserId={props.currentUserId}
                                        removal={props.removal}
                                        newMessageRef={props.newMessageRef}
                                        changeMessage={props.changeMessage}/>
                                    : <h2 style={{color: 'white', marginTop: '1em'}}>Пока нет сообщений</h2>
                                }</>
                                : <Preloader/>
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
                    currentUserId={props.currentUserId}
                    setShowUsers={setShowUsers}
                    setShowMenuSetting={setShowMenuSetting}
                    currentChat={props.currentChat}
                    usersList={props.usersList}
                    navigate={props.navigate}
                    unsubscribe={props.unsubscribe}
                    removal={props.removal}/>}


                {showUsers && <MenuUsersInChat
                    searchText={props.searchText}
                    usersInChat={props.usersInChat}
                    navigate={props.navigate}
                    setSearchText={props.setSearchText}
                    setShowUsers={setShowUsers}
                    setShowMenuSetting={setShowMenuSetting}/>}
            </div>

            <ChatFooter sendMessage={props.sendMessage} chekSubscription={props.chekSubscription}/>
        </div>
    );
};

export default Chat;