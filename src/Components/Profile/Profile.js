import React, {useState} from 'react';
import classes from './Profile.module.css'
import image from '../../image/anonymity.png'
import FormToProfile from "./FormToProfile";
import classButton from "../CssModules/Button.module.css";
import Preloader from "../Preloader/Preloader";


const Profile = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={classes.profileBlock}>
            {props.currentUser?.email
                ? <>
                    <div className={classes.title}>
                        {props.myProfile ? 'Ваш профиль:' : props.currentUser.name}
                    </div>

                    <div className={classes.avatar}>
                        <img alt={'No picture'} src={image}/>
                    </div>
                    {isEdit
                        ? <FormToProfile fieldList={props.fieldList} setIsEdit={setIsEdit} updateData={props.updateData}/>
                        : <>
                            {Object.entries(props.currentUser).map((element, index) => {
                                    if (element[0] !== 'uid' && element[0] !== 'listMyChats' && element[0] !== 'subscription') {
                                        return <div key={index} className={classes.item}>
                                            <span>{element[0]}</span>
                                            <span>{element[1] ? element[1] : 'Не указан'}</span>
                                        </div>
                                    }
                                }
                            )}
                            {props.myProfile
                                ? <button className={classButton.button} onClick={() => setIsEdit(true)}>Редактировать</button>
                                : <button className={classButton.button} onClick={() => props.createChat(props.currentUser.uid)}
                                >Отправить сообщение</button>}
                        </>
                    }
                </>
                : <Preloader/>
            }

        </div>
    );
};

export default Profile;