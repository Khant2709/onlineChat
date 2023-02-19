import React from 'react';
import {useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

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
                    return <div key={index}>

                        <label>
                            {el.name}:
                            <input
                                {...register(`${el.name}`, {
                                    required: 'Поле обязательное для заполнения',
                                    minLength: el.minLength,
                                    pattern: el.pattern,
                                })}
                                placeholder={el.name}
                                type={el.type}
                            />
                        </label>

                        <ErrorMessage
                            errors={errors}
                            name={el.name}
                            render={({ message }) => <p>{message}</p>}
                        />

                    </div>
                })}
                {props.error && <p>Вы ввели неверный пароль или имаил</p>}
                <button disabled={!isValid}>Войти</button>
            </form>
        </div>
    );
};

export default Form;