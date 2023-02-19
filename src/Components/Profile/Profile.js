import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {

    const currentUser = useSelector(state => state.auth.currentUser);
    console.log({currentUser})

    return (
        <div>
            <span>{currentUser.name}</span><br/>
            <span>{currentUser.email}</span>
        </div>
    );
};

export default Profile;