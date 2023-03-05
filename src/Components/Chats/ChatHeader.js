import React from 'react';
import classes from "./Chat.module.css";
import iconSetting from "../../image/icon-setting.png";
import moment from 'moment/min/moment-with-locales';
moment.locale('ru')

const settingCalendar = {
    lastDay: '[вчера в] LT',
    sameDay: '[сегодня в] LT',
    lastWeek: 'dddd [в] LT',
    sameElse: 'L'
}

const ChatHeader = (props) => {

    const companion = Array.isArray(props.currentChat.chatName) &&
        props.usersList.find(user => user.uid === props.currentChat.chatName.find(el => el !== props.currentUserId));

    return (
        <>
            <div className={classes.chatHeaderFirstBlock}>
                {Array.isArray(props.currentChat.chatName)
                    ? <div>
                        <div className={classes.chatHeaderName}>{companion.name}</div>
                        <div className={classes.chatHeaderTime}>
                        {companion.lastTimeToVisit &&
                            <>Был(а): {moment(companion.lastTimeToVisit).calendar(null,settingCalendar)}</>}
                            {companion.isOnline && <>Онлайн</>}
                        </div>
                    </div>
                    : props.currentChat.chatName
                }
            </div>
            <div className={classes.chatHeaderSetting} onClick={props.visibilitySettingMenu}>
                <img alt={'no img'} src={iconSetting}/>
            </div>
        </>
    );
};

export default ChatHeader;