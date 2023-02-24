import React from 'react';
import classes from './Header.module.css'
import image from '../../image/anonymity.png'

const Header = (props) => {

    return (
        <>
            <div className={classes.logo}>
                <span>LOGO</span>
            </div>
            {props.currentUserId !== null
                ? <>
                    {props.currentUser.email
                        ? <>
                            <div className={classes.profile}>
                                <div className={classes.profileAvatar}
                                     onClick={() => props.navigate(`/profile/${props.currentUserId}`)}>
                                    <img alt={'No picture'} src={image} className={classes.profileAvatar}/>
                                </div>
                                <div className={classes.profileInfo}>
                                    <div>{props.currentUser.name}</div>
                                    <div>{props.currentUser.email}</div>
                                    <button onClick={props.logout}>Logout</button>
                                </div>
                            </div>
                        </>
                        : <p>Идет загрузка....</p>
                    }
                </>
                : <div>
                    <p>Вы не авторизированы</p>
                    <button onClick={() => props.navigate('/')}>Войти</button>
                </div>
            }
        </>
    );
};

export default Header;