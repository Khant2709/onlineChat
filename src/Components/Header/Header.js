import React from 'react';
import classes from './Header.module.css'
import image from '../../image/anonymity.png'

const Header = (props) => {

    return (
        <>
            <div className={classes.logo}>
                <span>LOGO</span>
            </div>
            {props.currentUserId
                ? <>
                    <div className={classes.profile}>
                        <div className={classes.profileAvatar}>
                            <img alt={'No picture'} src={image} className={classes.profileAvatar}/>
                        </div>
                        <div className={classes.profileInfo}>
                            {props.currentUser
                                ? <>
                                    <div>{props.currentUser.name}</div>
                                    <div>{props.currentUser.email}</div>
                                    <button onClick={props.logout}>Logout</button>
                                </>
                                : <p>Идет загрузка....</p>
                            }
                        </div>
                    </div>
                </>
                : <p>Вы не авторизированы</p>
            }
        </>
    );
};

export default Header;