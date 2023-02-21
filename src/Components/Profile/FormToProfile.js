import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import classes from './Profile.module.css';

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {props.fieldList.map((el, index) => {
                    return <div key={index}>

                            <input
                                {...register(`${el.name}`, {
                                    required: el.required,
                                    minLength: el.minLength,
                                    pattern: el.pattern,
                                    max: el.max,
                                    min: el.min,
                                    disabled: el.disabled
                                })}
                                placeholder={el.name}
                                type={el.type}
                                className={classes.inp}

                            />

                        <ErrorMessage
                            errors={errors}
                            name={el.name}
                            render={({message}) => <p className={classes.error}>{message}</p>}
                        />

                    </div>
                })}
                <button disabled={!isValid} className={classes.btnForm}>Сохранить</button>
            </form>
            <button onClick={() => props.setIsEdit(false)} className={classes.btnForm}>Отмена</button>
        </div>
    );
};

export default FormToProfile;