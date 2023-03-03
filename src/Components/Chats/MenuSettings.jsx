import React from 'react';
import classesMenu from "./MenuSettings.module.css";
import iconClose from '../../image/icon-cancel.png'
import imgChat from '../../image/free-icon-group-745205.png'
import searchUser from '../../image/free-icon-search-975658.png'
import iconAbout from '../../image/free-icon-about-3356181.png'
import logoutChat from '../../image/free-icon-exit-1246286.png'

const MenuSettings = (props) => {

    const closeMenu = () => {
        props.setShowMenuSetting(false);
        props.setShowUsers(false);
    }

    const showUsersInChat = () => {
        props.setShowMenuSetting(false);
        props.setShowUsers(true);
    }

    return (
        <div className={classesMenu.mainBlock}>

            <div  className={classesMenu.header}>
                <div  className={classesMenu.nameChat}>
                    Информация о чате
                </div>
                <img alt={'no img'} src={iconClose} onClick={closeMenu}/>
            </div>

            <div  className={classesMenu.chatInfo}>
                <img alt={'no img'} src={imgChat}/>
                <div className={classesMenu.chatInfoText}>
                    <div  className={classesMenu.chatName}>Name Chat</div>
                    <div  className={classesMenu.amountSubs}>1,,1 подписчиков</div>
                </div>
            </div>

            <div  className={classesMenu.usersInChat} onClick={showUsersInChat}>
                <img alt={'no img'} src={searchUser}/>
                <p>Поиск из подписчиков</p>
            </div>

            <div  className={classesMenu.chatCredential}>
                <img alt={'no img'} src={iconAbout}/>
                <div className={classesMenu.chatCredentialBlock}>
                    <div className={classesMenu.aboutChat}>
                        Основная информация
                    </div>
                    <div className={classesMenu.chatCreator}>
                        Администратор: <br/>
                        <p>@Vladislav</p>
                    </div>
                </div>
            </div>

            <div  className={classesMenu.footer}>
                <img alt={'no img'} src={logoutChat}/>
                <p>Покинуть чат</p>
            </div>

        </div>
    );
};

export default MenuSettings;