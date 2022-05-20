import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import accountIcon from "../images/header__account-icon.svg";

function DropDownMenu(props) {

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="drop">
      <div className="drop__container">
        <nav className="drop__nav-box">
          <Link to={'/'} className="drop__nav-link">Главная</Link>
          <Link to={'/movies'}
                className={location.pathname === '/movies' ? 'drop__nav-link drop__nav-link_active' : 'drop__nav-link'}>Фильмы</Link>
          <Link to={'/saved-movies'}
                className={location.pathname === '/saved-movies' ? 'drop__nav-link drop__nav-link_active' : 'drop__nav-link'}>Сохранённые
            фильмы</Link>
        </nav>
        <button type={'button'} className="drop__account" onClick={() => {navigate('/profile')}}>Аккаунт<img className="header__account-icon" src={accountIcon}
                                                                      alt="accountIcon"/></button>
        <button className="drop__close-button" onClick={props.onCloseClick}/>
      </div>
    </div>
  )
}

export default DropDownMenu;