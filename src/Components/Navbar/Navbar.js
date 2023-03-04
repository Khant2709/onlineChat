import React from 'react';
import classes from './Navbar.module.css'
import classButton from "../CssModules/Button.module.css";
import NavbarChatsList from "./NavbarChatsList";


const Navbar = (props) => {

    return (
        <div className={'navbar'}>

            <div className={classes.searchChat}>
                <input placeholder={'Найти чат'}
                       className={classes.searcher}
                       value={props.searchText}
                       onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>

            <NavbarChatsList
                chatsList={props.chatsList}
                currentUserId={props.currentUserId}
                nowUrl={props.nowUrl}
                readMessage={props.readMessage}/>

            <div className={classes.createChat}>
                <button onClick={() => props.navigate('/chat/create')}
                        className={classButton.button}>Создать чат
                </button>
            </div>
        </div>
    );
};

export default Navbar;