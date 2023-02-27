import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import classes from './Profile.module.css';
import classButton from "../CssModules/Button.module.css";

const FormToProfile = (props) => {

    let defaultValue ={};
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
        props.updateData(data)
        props.setIsEdit(false)
    }

    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

                {props.fieldList.map((el, index) => {
                    return <div key={index}>

                            <input
                                {...register(`${el.name}`, {
                                    required: el.required ? el.required : null,
                                    minLength: el.minLength ? el.minLength : null,
                                    pattern: el.pattern ? el.pattern : null,
                                    max: el.max ? el.max : null,
                                    min: el.min ? el.min : null,
                                })}
                                placeholder={el.name}
                                type={el.type}
                                className={classes.inp}
                                readOnly={el.type === 'email' && true }

                            />

                        <ErrorMessage
                            errors={errors}
                            name={el.name}
                            render={({message}) => <p className={classes.error}>{message}</p>}
                        />

                    </div>
                })}
                <button disabled={!isValid} className={classButton.button}>Сохранить</button>
            </form>
            <button onClick={() => props.setIsEdit(false)} className={classButton.button}>Отмена</button>
        </div>
    );
};

export default FormToProfile;