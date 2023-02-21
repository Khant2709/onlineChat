import React, {useState} from 'react';
import classes from './Profile.module.css'
import image from '../../image/anonymity.png'
import FormToProfile from "./FormToProfile";


const Profile = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={classes.profileBlock}>
            {props.currentUser
                ? <>
                    <div className={classes.title}>
                        Ваш профиль:
                    </div>

                    <div className={classes.avatar}>
                        <img alt={'No picture'} src={image}/>
                    </div>
                    {isEdit
                        ?
                        <FormToProfile fieldList={props.fieldList} setIsEdit={setIsEdit} updateData={props.updateData}/>
                        : <>
                            {Object.entries(props.currentUser).map((element, index) => {
                                    if (element[0] !== 'uid') {
                                        return <div key={index} className={classes.item}>
                                            <span>{element[0]}</span>
                                            <span>{element[1] ? element[1] : 'Не указан'}</span>
                                        </div>
                                    }
                                }
                            )}
                            <button className={classes.btn} onClick={() => setIsEdit(true)}>Редактировать</button>
                        </>
                    }
                </>
                : <p>Идет загрузка....</p>
            }

        </div>
    );
};

export default Profile;