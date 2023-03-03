import React from 'react';
import classes from "./MenuUsersInChat.module.css";
import image from "../../image/anonymity.png";
import iconBack from "../../image/free-icon-left-3356554.png";

const MenuUsersInChat = (props) => {

    const closeUsersMenu = () => {
        props.setShowMenuSetting(true);
        props.setShowUsers(false);
    }

    return (
        <div className={classes.usersChat}>
            <div className={classes.searchUser}>
                <img alt={'no img'} src={iconBack} onClick={closeUsersMenu}/>
                <input placeholder={'Найти пользователя'}
                       value={props.searchText}
                       onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>

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
    );
};

export default MenuUsersInChat;