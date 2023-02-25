import React, {useEffect, useState} from "react";
import './App.css';
import Registration from "./Components/Auth/Registration";
import {Route, Routes} from "react-router";
import Login from "./Components/Auth/Login";
import HeaderContainer from "./Components/Header/HeaderContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import ChatContainer from "./Components/Chats/ChatContainer";
import {useSelector} from "react-redux";

function App() {

    const currentUserId = useSelector(state => state.auth.currentUserId);
    const [show, setShow] = useState(false);
    const [showAllChats, setShowAllChats] = useState(false);

    useEffect(() => {
        currentUserId && setShow(true);
    }, [currentUserId])

    return (
        <>
            {show
                ? <div className={'mainBlock'}>
                    <HeaderContainer showAllChats={showAllChats} setShowAllChats={setShowAllChats}/>
                    <div className={'minorBlock'}>
                        {showAllChats && <NavbarContainer/>}
                        <div className={'content'}>
                            <Routes>
                                <Route path={'/'} element={<Login setShow={setShow}/>}/>
                                <Route path={'/registration'} element={<Registration/>}/>
                                <Route path={'/profile/*'} element={<ProfileContainer/>}/>
                                <Route path={'/chat/*'} element={<ChatContainer/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
                : <div  className={'main'}>
                    <button className='glowing-btn' onClick={() => setShow(true)}>
                        <span className='glowing-txt'>В<span
                        className='faulty-letter'>Х</span>ОД</span>
                    </button>
                </div>
            }
        </>
    )
}

export default App;
