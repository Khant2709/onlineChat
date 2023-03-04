import React, {useState} from 'react';
import classes from "./Chat.module.css";
import classButton from "../CssModules/Button.module.css";
import InputEmoji from "react-input-emoji";


const ChatFooter = (props) => {

    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        props.sendMessage(messageText)
        setMessageText('');
    }

    return (
        <div className={classes.chatFooter}>
            <InputEmoji
                borderRadius={10}
                placeholder={'Введите сообщение'}
                value={messageText}
                theme={'dark'}
                onChange={setMessageText}
                cleanOnEnter
                onEnter={sendMessage}
                disabled={!props.chekSubscription}
            />
            <button disabled={messageText.trim().length < 2}
                    onClick={sendMessage}
                    className={classButton.button}
            >Отправить</button>
        </div>
    );
};

export default ChatFooter;