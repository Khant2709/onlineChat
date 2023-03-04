import React from 'react';
import {useForm} from "react-hook-form";
import classes from "./ChatCreate.module.css";
import {ErrorMessage} from "@hookform/error-message";
import classButton from "../CssModules/Button.module.css";

const FormToChat = (props) => {

    let defaultValue = {};
    props.fieldList.forEach(el => {
        return defaultValue[el.name] = el.value;
    })

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: defaultValue,
        mode: 'all'
    });

    const onSubmit = data => {
        props.actionWithChat(data)
    }

    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

                {props.fieldList.map((el, index) => {
                    return <div key={index}>
                        {el.typeTeg === "input" &&
                        <input
                            {...register(`${el.name}`, {
                                required: el.required ? el.required : null,
                                minLength: el.minLength ? el.minLength : null,
                                maxLength: el.maxLength ? el.maxLength : null,
                            })}
                            placeholder={el.nameRu}
                            type={el.type}
                            readOnly={el.type === 'email' && true}/>}

                        {el.typeTeg === "textarea" &&
                        <textarea
                            {...register(`${el.name}`, {
                                required: el.required ? el.required : null,
                                minLength: el.minLength ? el.minLength : null,
                                maxLength: el.maxLength ? el.maxLength : null,
                            })}
                            placeholder={el.nameRu}
                            readOnly={el.type === 'email' && true}/>}

                        <ErrorMessage
                            errors={errors}
                            name={el.name}
                            render={({message}) => <p className={classes.error}>{message}</p>}/>
                    </div>
                })}
                <button disabled={!isValid} className={classButton.button}>Сохранить</button>
            </form>
            <button className={classButton.button}>Отмена</button>
        </div>
    );
};

export default FormToChat;