import React, {useContext, useState} from "react";
import Header from "./Header";
import DropDownMenu from "./DropDownMenu";
import {CurrentUserContext} from "../contexts/contexts";
import api from "../utils/MainApi";


function Profile(props) {
  const currentUser = useContext(CurrentUserContext)

  const [values, setValues] = useState({
    email: '',
    name: ''
  })

  const handleChange = (event) => {
    const {name, value} = event.target

    setValues(v => ({
      ...v,
      [name]: value
    }))
  }

  const handleUpdate = ({}) => {
    props.onUpdateUser({name: values.name, email: values.email})
  }

  return (
    <>
      <Header onIconClick={props.dropToggle}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}`}</h1>
          <div className="profile__edit-input">
            <p className="profile__input-key">Имя</p>
            <input className="profile__input-value"
                   type="text"
                   value={currentUser.name}
                   onChange={handleChange}
                   name='name'
            />
          </div>
          <div className="profile__edit-input">
            <p className="profile__input-key">E-mail</p>
            <input className="profile__input-value"
                   type="text"
                   value={currentUser.email}
                   name='email'
                   onChange={handleChange}
            />
          </div>
          <p className="profile__edit" onChange={handleUpdate}>Редактировать</p>
          <p onClick={props.logout} className="profile__exit">Выйти из аккаунта</p>
        </div>
      </section>
      <DropDownMenu onCloseClick={props.dropToggle}/>
    </>
  )
}

export default Profile;