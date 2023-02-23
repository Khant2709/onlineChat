import React from "react";
import './App.css';
import Registration from "./Components/Auth/Registration";
import {Route, Routes} from "react-router";
import Login from "./Components/Auth/Login";
import HeaderContainer from "./Components/Header/HeaderContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import ChatContainer from "./Components/Chats/ChatContainer";

function App() {

    return (
        <div className={'mainBlock'}>
            <HeaderContainer/>
            <div className={'minorBlock'}>
                <NavbarContainer/>
                <div  className={'content'}>
                    <Routes>
                        <Route path={'/'} element={<Login/>}/>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/profile/*'} element={<ProfileContainer/>}/>
                        <Route path={'/chat/*'} element={<ChatContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
