import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "../../firebase/FirebaseAuthProvider";
import {useNavigate} from "react-router";
import {updateCurrentUser} from "../../Redux/AuthSlice";
import {useDatabase} from "../../firebase/FirebaseDatabaseProvider";

const Profile = () => {

    const {logout, currentUserId} = useAuth();
    const {getUser} = useDatabase();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);
    console.log('currentUserId', currentUserId);


    useEffect(() => {
        currentUserId && getUser(currentUserId)
            .then((data) => {
                console.log('0000', data);
                dispatch(updateCurrentUser({name: data.username, email: data.email}))
            })
    }, [currentUserId])

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
        <div>
            {currentUser.email
                ? <>
                    <span>{currentUser.name}</span><br/>
                    <span>{currentUser.email}</span><br/>
                    <button onClick={logOut}>logout</button>
                </>
                : <p>Идет загрузка....</p>
            }

        </div>
    );
};

export default Profile;