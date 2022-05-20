import React from 'react'
import headerLogo from '../images/header__logo.svg'
import {useLocation, useNavigate} from "react-router-dom";
import accountIcon from '../images/header__account-icon.svg'
import menuIcon from '../images/header__menu.svg'

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate()

  return (
    <header
      className={(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile')
        ? "header_in-app"
        : "header"}>
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="header logo"/>
        {!(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile')
          ? <div className="header__nav-box">
            <p className="header__text" onClick={() => {
              navigate('/signup')
            }}>Регистрация</p>
            <button className="header__button" onClick={() => {
              navigate('/signin')
            }}>Войти
            </button>
          </div>
          : <><img src={menuIcon} alt="menu" className="header__menu-icon" onClick={props.onIconClick}/>
            <div className="header__nav-box header__nav-box_changed">
              <div className="header__nav-box">
                <p className={location.pathname === '/movies'
                  ? "header__nav-text header__nav-text_active"
                  : "header__nav-text"}
                   onClick={() => {
                     navigate('/movies')
                   }}>Фильмы</p>
                <p className={location.pathname === '/saved-movies'
                  ? "header__nav-text header__nav-text_active"
                  : "header__nav-text"}
                   onClick={() => {
                     navigate('/saved-movies')
                   }}>Сохранённые фильмы</p>
              </div>
              <button type={'button'} className="header__account" onClick={() => {
                navigate('/profile')
              }}>Аккаунт<img className="header__account-icon"
                             src={accountIcon} alt="accountIcon"/>
              </button>
            </div>
          </>}
      </div>
    </header>
  )
}

export default Header;