import React from 'react';
import Header from "./Header";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";

const HeaderContainer = (props) => {

    const {logout} = useAuth();
    const {newUpdateUser} = useDatabase();
    const navigate = useNavigate();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);


    const logOut = () => {
        logout().then(() => {
            localStorage.removeItem('currentUserId')
            const updates = {};
            updates[`allUsers/${currentUserId}/isOnline`] = false;
            updates[`allUsers/${currentUserId}/lastTimeToVisit`] = Date.now();
            newUpdateUser(updates).then(() => {
                navigate('/');
            })
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
                    setShowAllChats={props.setShowAllChats}
                    showAllChats={props.showAllChats}
            />
        </div>
    );
};

export default HeaderContainer;