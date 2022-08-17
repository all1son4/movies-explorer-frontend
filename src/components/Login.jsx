import React, {useState} from "react";
import logo from '../images/header__logo.svg'
import {Link, useNavigate} from "react-router-dom";
import validationHelper from "../utils/ValidationHelper";
import * as authApi from "../utils/authApi";
import InfoToolTip from "./InfoToolTip";
import failIcon from "../images/fail_icon.svg";
import ButtonLoader from "./ButtonLoader";

function Login({onLogin}) {
  const navigate = useNavigate();
  const [infoToolTipIsOpen, setInfoToolTipIsOpen] = useState(false)
  const [buttonLoader, setButtonLoader] = useState(false)
  const helper = validationHelper()
  const {values, handleChange, errors, isValidate, onFocus} = helper;
  const config = {
    icon: failIcon,
    info: "Что-то пошло не так. Проверьте логин или пароль.",
    status: "fail"
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    setButtonLoader(true)

    authApi
      .authorize({
        email: values.email,
        password: values.password
      })
      .then(res => {
        if (res.statusCode !== 400 || res.statusCode !== 401) {
          onLogin();
          navigate('/movies')
        } else {
          setInfoToolTipIsOpen(true)
        }
      })
      .finally(() => {
        setButtonLoader(false)
      })
      .catch((err) => {
        console.log(err)
        setInfoToolTipIsOpen(true)
        setButtonLoader(false)
      })
  }

  return (
    <div className="auth">
      <img src={logo} alt="logo" className="auth__logo"/>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form"
            onSubmit={handleSubmit}
      >
        <label className="auth__label">E-mail</label>
        <input
          type="text"
          id="register-mail"
          name="email"
          autoComplete={'off'}
          value={values.email}
          onChange={handleChange}
          onFocus={onFocus}
          className={`auth__field ${errors.email ? 'auth__field_wrong' : ''}`}
          minLength="2"
          maxLength="30"
          disabled={buttonLoader}
          required/>
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
          disabled={buttonLoader}
          required/>
        {errors.password && <span className="auth__valid-span">{errors.password}</span>}
        <button type="submit"
                className={`auth__submit-button auth__submit-button_login ${!isValidate || errors.password || errors.email ? 'auth__submit-button_disabled' : ''}`}
                disabled={!isValidate || errors.password || errors.email || buttonLoader}
        >{buttonLoader
          ? <ButtonLoader/>
          : 'Войти'}
        </button>
      </form>
      <p className="auth__text">Еще не зарегестрированы? <Link to="/signup" target="_self"
                                                               className="auth__link">Регистрация</Link></p>
      <InfoToolTip isOpen={infoToolTipIsOpen}
                   name='infoToolTip'
                   config={config}
                   setIsOpen={setInfoToolTipIsOpen}
      />
    </div>
  )
}

export default Login;