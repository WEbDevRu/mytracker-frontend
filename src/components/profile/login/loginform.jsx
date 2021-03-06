import React, {useEffect, useState} from 'react';
import s from './login.module.scss';
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../components/common/formControls"
import {required} from "../../../utils/validation";
import doneImg from "../../../assets/icons/done.svg";
import {BackGround} from "../../../components/common/background"


const SuccessForm = () =>{
    const [redirect, setRedirect] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{setRedirect(true)},1500)
    },[])
    return(
            <div className={s.success_auth}>
                {redirect && <Redirect to='/summary' />}
                <img src={doneImg} alt=""/><p>Вы авторизованы</p>
            </div>
    )
}

const LoginForm = (props) =>{

    return (
            <form onSubmit={props.handleSubmit}>
                <h1 className={s.h1}>Вход</h1>
                <div className={s.form_danger_wr}>{props.error ? <span className={s.form_danger}>{props.error}</span> : ''}</div>
                <div className={props.isFetching === true ? s.loading_bar + " " + s.active : s.loading_bar}></div>
                <Field name="emailInput" type="text"  component={Input} placeholder="Почта" validate={required}/>
                <Field name="passwordInput" type="password"  component={Input} placeholder="Пароль" validate={required}/>
                <p className={s.dont_reg_yet}>Нет учётной записи? <NavLink to='signup'>Создайте её!</NavLink></p>
                <button className='control_button' disabled={props.submitting || props.error}  type="submit" >Войти</button>

            </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login-form'})(LoginForm)

const LoginBlock = (props) => {

    const onSubmit = (values) =>{
        props.sendLoginRequest(values.emailInput, values.passwordInput)

    }


    return  (
            <>
           <BackGround />
          <div className={`container ${s.login_container}`}>
              <div className={s.login_block}>
                  {props.isAuth == false ?
                          <div className={s.form}>
                              <LoginReduxForm isFetching={props.isFetching} onSubmit={onSubmit}/>
                          </div>
                          :
                          <SuccessForm />

                  }
                      </div>
        </div>
                </>

    );
}
export default LoginBlock;