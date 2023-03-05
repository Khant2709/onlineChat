import React from 'react';
import classesMenu from "./MenuSettings.module.css";
import iconClose from '../../image/icon-cancel.png'
import MenuSettingsChat from "./MenuSettingsChat";
import MenuSettingsCompanion from "./MenuSettingsCompanion";

const MenuSettings = (props) => {

    const isPrivate = Array.isArray(props.currentChat.chatName);
    const companion = isPrivate &&
        props.usersList.find(user => user.uid === props.currentChat.chatName.find(el => el !== props.currentUserId));


    const closeMenu = () => {
        props.setShowMenuSetting(false);
        props.setShowUsers(false);
    }

    const showUsersInChat = () => {
        props.setShowMenuSetting(false);
        props.setShowUsers(true);
    }

    const deleteChat = (pathToDelete) => {
        props.removal(pathToDelete)
        props.navigate(`/profile/${props.currentUserId}`)
    }

    const deleteMessages = (pathToDelete, redirect) => {
        props.removal(pathToDelete)
        redirect && props.navigate(`/profile/${props.currentUserId}`)
    }

    return (
        <div className={classesMenu.mainBlock}>

            <div  className={classesMenu.header}>
                <div  className={classesMenu.nameChat}>
                    {isPrivate ? `Настройки :` : 'Информация о чате :'}
                </div>
                <img alt={'no img'} src={iconClose} onClick={closeMenu}/>
            </div>

            {!isPrivate
                ? <MenuSettingsChat usersList={props.usersList}
                               currentChat={props.currentChat}
                               showUsersInChat={showUsersInChat}
                               navigate={props.navigate}
                               currentUserId={props.currentUserId}
                               deleteChat={deleteChat}
                               unsubscribe={props.unsubscribe}/>
                : <MenuSettingsCompanion
                    companion={companion}
                    navigate={props.navigate}
                    currentChat={props.currentChat}
                    deleteMessages={deleteMessages}
                />}
        </div>
    );
};

export default MenuSettings;