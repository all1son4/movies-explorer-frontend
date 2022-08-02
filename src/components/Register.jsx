import React, {useState} from "react";
import logo from '../images/header__logo.svg'
import {Link, useNavigate} from "react-router-dom";
import authHelper from "../utils/Helper";
import failIcon from "../images/fail_icon.svg";
import completeIcon from "../images/complete_icon.svg"
import InfoToolTip from "./InfoToolTip";
import * as authApi from "../utils/authApi";

function Register({register, registerError}) {
  const [infoToolTipIsOpen, setInfoToolTipIsOpen] = useState(false)
  const [config, setConfig] = useState({
    info: '',
    icon: '',
    status: ''
  })

  const helper = authHelper()
  const {values, handleChange, errors, isValidate, onFocus} = helper;

  const handleSubmit = (event) => {
    event.preventDefault();
    authApi
      .register(values)
      .then((res) => {
        if (res.statusCode !== 400) {
          setConfig({
            info: 'Вы успешно зарегистрировались!',
            icon: completeIcon,
            status: 'complete'
          });
        }
        setInfoToolTipIsOpen(true);
        helper.afterSubmit();
      })
      .catch((err) => {
        console.log(err)
        if (err === 409) {
          setConfig({
            info: 'Что-то пошло не так! Кажется такой пользователь уже существует',
            icon: failIcon,
            status: 'fail'
          });
        } else {
          setConfig({
            info: 'Что-то пошло не так! Проверьте введенные данные.',
            icon: failIcon,
            status: 'fail'
          });
        }
        setInfoToolTipIsOpen(true);
      });
  }

  return (
    <div className="auth">
      <img src={logo} alt="logo" className="auth__logo"/>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">Имя</label>
        <input
          type="text"
          id="register-name"
          name="name"
          autoComplete={'off'}
          value={values.name}
          onChange={handleChange}
          onFocus={onFocus}
          className={`auth__field ${errors.name ? 'auth__field_wrong' : ''}`}
          minLength="2"
          maxLength="30"
          required
        />
        {errors.name && <span className="auth__valid-span">{errors.name}</span>}
        <label className="auth__label">E-mail</label>
        <input
          type="email"
          id="register-mail"
          name="email"
          autoComplete={'off'}
          value={values.email}
          onChange={handleChange}
          onFocus={onFocus}
          className={`auth__field ${errors.email ? 'auth__field_wrong' : ''}`}
          minLength="2"
          maxLength="30"
          required
        />
        {errors.email && <span className="auth__valid-span">{errors.email}</span>}
        <label className="auth__label">Пароль</label>
        <input
          type="password"
          id="register-password"
          name="password"
          autoComplete={'off'}
          value={values.password}
          onChange={handleChange}
          onFocus={onFocus}
          className={`auth__field ${errors.password ? 'auth__field_wrong' : ''}`}
          minLength="8"
          maxLength="30"
          required
        />
        {errors.password && <span className="auth__valid-span">{errors.password}</span>}
        <button type="submit"
                className="auth__submit-button auth__submit-button_register"
                disabled={infoToolTipIsOpen}
        >Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/signin" target="_self"
                                                            className="auth__link">Войти</Link></p>
      <InfoToolTip isOpen={infoToolTipIsOpen}
                   name='infoToolTip'
                   config={config}
                   setIsOpen={setInfoToolTipIsOpen}
      />
    </div>
  )
}

export default Register