import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import classes from './Auth.module.css';

const Form = (props) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({mode: 'all'});

    const onSubmit = data => {
        props.login(data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {props.fieldList.map((el, index) => {
                    return <div key={index} className={classes.item}>

                        <label className={classes.label}>
                            <span>
                                {el.name}:
                            </span>
                            <input
                                {...register(`${el.name}`, {
                                    required: 'Поле обязательное для заполнения',
                                    minLength: el.minLength,
                                    pattern: el.pattern,
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
                        </label>
                    </div>
                })}
                {props.error && <p>Вы ввели неверный пароль или имаил</p>}
                <button disabled={!isValid} className={classes.btn}>Войти</button>
            </form>
        </div>
    );
};

export default Form;