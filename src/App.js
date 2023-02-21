import React from "react";
import './App.css';
import Registration from "./Components/Auth/Registration";
import {Route, Routes} from "react-router";
import Login from "./Components/Auth/Login";
import Navbar from "./Components/Navbar/Navbar";
import HeaderContainer from "./Components/Header/HeaderContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";

function App() {

    return (
        <div className={'mainBlock'}>
            <HeaderContainer/>
            <div className={'minorBlock'}>
                <Navbar/>
                <div  className={'content'}>
                    <Routes>
                        <Route path={'/'} element={<Login/>}/>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/profile/*'} element={<ProfileContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
