import React from "react";
import logo from '../images/header__logo.svg'
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className="auth">
      <img src={logo} alt="logo" className="auth__logo"/>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form">
        <label className="auth__label">Имя</label>
        <input
          type="text"
          id="register-name"
          name="name"
          value={'Дмитрий'}
          className="auth__field"
          minLength="2"
          maxLength="30"
          required />
          <span className="auth__valid-span">Что-то пошло не так...</span>
        <label className="auth__label">E-mail</label>
        <input
          type="email"
          id="register-mail"
          name="mail"
          value={'randomMail@gmail.com'}
          className="auth__field"
          minLength="2"
          maxLength="30"
          required />
        <span className="auth__valid-span">Что-то пошло не так...</span>
        <label className="auth__label">Пароль</label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={'1234567890'}
          className="auth__field"
          minLength="2"
          maxLength="30"
          required />
        <span className="auth__valid-span">Что-то пошло не так...</span>
        <button type="submit" className="auth__submit-button auth__submit-button_register">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/signin" target="_self" className="auth__link">Войти</Link></p>
    </div>
  )
}

export default Register