import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useAuth} from "../../firebase/FirebaseAuthProvider";

const HeaderContainer = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const usersList = useSelector(state => state.users.usersList);
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        setCurrentUser(usersList.find(user => user.uid === currentUserId))
    }, [usersList])

    const logOut = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className={'header'}>
            <Header currentUser={currentUser}
                    logout={logOut}
                    currentUserId={currentUserId}
                    navigate={navigate}
            />
        </div>
    );
};

export default HeaderContainer;