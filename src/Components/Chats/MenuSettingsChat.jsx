import React from 'react';
import classesMenu from "./MenuSettings.module.css";
import imgChat from '../../image/free-icon-group-745205.png'
import searchUser from '../../image/free-icon-search-975658.png'
import iconAbout from '../../image/free-icon-about-3356181.png'
import logoutChat from '../../image/free-icon-exit-1246286.png'
import iconDelete from '../../image/free-icon-delete-3356414.png'
import iconPencil from '../../image/free-icon-pencil-7585561.png'

const MenuSettings = (props) => {

    const admin = props.usersList.find(user => user.uid === props.currentChat.chatAdmin)

    return (
        <>
            <div  className={classesMenu.chatInfo}>
                <img alt={'no img'} src={imgChat}/>
                <div className={classesMenu.chatInfoText}>
                    <div  className={classesMenu.chatName}>{props.currentChat.chatName}</div>
                    <div  className={classesMenu.amountSubs}>
                        {props.currentChat.subscribers.length}
                        {props.currentChat.subscribers.length < 5 ? ' подписчика' : ' подписчиков'}
                    </div>
                </div>
            </div>

            <div  className={classesMenu.usersInChat} onClick={props.showUsersInChat}>
                <img alt={'no img'} src={searchUser}/>
                <p>Поиск из подписчиков</p>
            </div>

            <div  className={classesMenu.chatCredential}>
                <img alt={'no img'} src={iconAbout}/>
                <div className={classesMenu.chatCredentialBlock}>
                    <div className={classesMenu.aboutChat}>
                        {props.currentChat.chatAbout ? props.currentChat.chatAbout : 'Основная информация'}
                    </div>
                    <div className={classesMenu.chatCreator}>
                        Администратор: <br/>
                        <p onClick={() => {props.navigate(`/profile/${admin.uid}`)}}>@{admin.name}</p>
                    </div>
                </div>
            </div>

            {props.currentChat.chatAdmin === props.currentUserId &&
            <div  className={classesMenu.editChat} onClick={() => props.navigate(`/chat/edit/${props.currentChat.chatId}`)}>
                <img alt={'no img'} src={iconPencil}/>
                <div>Редактировать</div>
            </div>}

            {props.currentChat.chatAdmin === props.currentUserId
                ? <div  className={classesMenu.footer + ' ' + classesMenu.delete}>
                    <img alt={'no img'} src={iconDelete}/>
                    <p onClick={() => props.deleteChat(`allChats/${props.currentChat.chatId}`)}>
                        Удалить чат
                    </p>
                </div>
                : <div  className={classesMenu.footer}>
                    <img alt={'no img'} src={logoutChat}/>
                    <p onClick={props.unsubscribe}>
                        Покинуть чат
                    </p>
                </div>
            }
        </>
    );
};

export default MenuSettings;