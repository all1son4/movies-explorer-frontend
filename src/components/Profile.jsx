import React from "react";
import Header from "./Header";
import DropDownMenu from "./DropDownMenu";

function Profile(props) {
  return (
    <>
      <Header onIconClick={props.dropToggle}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Дмитрий!</h1>
          <div className="profile__edit-input">
            <p className="profile__input-key">Имя</p>
            <input className="profile__input-value" type="text" value={'Дмитрий'}/>
          </div>
          <div className="profile__edit-input">
            <p className="profile__input-key">E-mail</p>
            <input className="profile__input-value" type="email" value={'dm.strok98@gmail.com'}/>
          </div>
          <p className="profile__edit">Редактировать</p>
          <p className="profile__exit">Выйти из аккаунта</p>
        </div>
      </section>
      <DropDownMenu onCloseClick={props.dropToggle}/>
    </>
  )
}

export default Profile;