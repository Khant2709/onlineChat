import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import classes from './Auth.module.css';
import classButton from '../CssModules/Button.module.css';
import showPasswordIcon from '../../image/showPassword.png'
import hiddenPasswordIcon from '../../image/hiddenPassword.png'

const Form = (props) => {

    const [showPassword, setShowPassword] = useState(false);

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
                        <input
                            {...register(`${el.name}`, {
                                required: 'Поле обязательное для заполнения',
                                minLength: el.minLength ? el.minLength : {
                                    value: 6,
                                    message: 'Минимально 6 символов'
                                },
                                maxLength: el.maxLength ? el.maxLength : {
                                    value: 30,
                                    message: 'Максимально 30 символов'
                                },
                                pattern: el.pattern ? el.pattern : null,
                            })}
                            placeholder={el.name}
                            type={el.type === 'password' && !showPassword ? 'password' : 'text'}
                            className={classes.inp}
                        />
                        {el.type === 'password' && <img alt={'no picture'}
                                                        src={showPassword ? showPasswordIcon : hiddenPasswordIcon}
                                                        onClick={() => setShowPassword(!showPassword)}
                        />}
                        <ErrorMessage
                            errors={errors}
                            name={el.name}
                            render={({message}) => <p className={classes.error}>{message}</p>}
                        />
                    </div>
                })}
                {props.error && <p>Вы ввели неверный пароль или имаил</p>}
                <button disabled={!isValid} className={classButton.button}>Войти</button>
            </form>
        </div>
    );
};

export default Form;