import React, {useState} from 'react';
import classes from './Chat.module.css'
import {useNavigate} from "react-router";


const ChatCreate = (props) => {

    const [nameChat, setNameChat] = useState('');
    const navigate = useNavigate();

    const addChat = () => {
        props.createChat(nameChat);
        setNameChat('');
    }

    return (
        <div  className={classes.chatCreate}>
            <div className={classes.chatCreateTitle}>
                Создание нового чата
            </div>
            <div className={classes.chatCreateInp}>
                Название чата:
                <input type={'text'}
                       placeholder={'Название чата'}
                       value={nameChat}
                       onChange={(e)=>setNameChat(e.target.value)}
                />
            </div>
            <div className={classes.chatCreateBtn}>
                <button disabled={nameChat.trim().length < 3} onClick={addChat}>
                    Создать
                </button>
                <button onClick={() => navigate('/profile')}>
                    Отмена
                </button>
            </div>
        </div>
    );
};

export default ChatCreate;