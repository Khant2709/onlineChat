import React from 'react';
import classes from './Header.module.css'

const Header = (props) => {

    return (
        <>
            <div className={classes.logo}>
                <span>START-CHAT</span>
            </div>
            <div className={classes.menu}>
                <button onClick={() => props.setShowAllChats(!props.showAllChats)}
                     className={classes.menuItem} disabled={!props.currentUserId}>
                    Все чаты
                </button>
                <button onClick={() => props.navigate(`/profile/${props.currentUserId}`)}
                        className={classes.menuItem} disabled={!props.currentUserId}>
                    Профиль
                </button>
                <button onClick={props.logout} className={classes.menuItem}
                        disabled={!props.currentUserId}>
                    {props.currentUserId ? 'Выйти' : 'Войти'}
                </button>
            </div>
        </>
    );
};

export default Header;