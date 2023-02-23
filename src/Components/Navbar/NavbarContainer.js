import React from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";

const NavbarContainer = () => {

    const chatsList = useSelector(state => state.users.chatsList);
    // console.log(chatsList)

    return (
        <>
            <Navbar chatsList={chatsList}/>
        </>
    );
};

export default NavbarContainer;