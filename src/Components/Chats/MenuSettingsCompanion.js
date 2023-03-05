import React from 'react';
import classesMenu from "./MenuSettings.module.css";

const MenuSettingsCompanion = (props) => {

    return (
        <div  className={classesMenu.blockUserSetting}>
            <div className={classesMenu.row}
                 onClick={() => props.navigate(`/profile/${props.companion.uid}`)}>
                Переход на профиль
            </div>
            <div className={classesMenu.row}
                onClick={() => props.deleteMessages(`allChats/${props.currentChat.chatId}/messages` , false)}>
                Отчистка переписки
            </div>
            <div className={classesMenu.row + ' ' + classesMenu.delete}
                onClick={() => props.deleteMessages(`allChats/${props.currentChat.chatId}`, true)}>
                Удалить переписку
            </div>
        </div>
    );
};

export default MenuSettingsCompanion;