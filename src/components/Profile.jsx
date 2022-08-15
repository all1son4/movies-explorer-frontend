import React, {useContext, useEffect, useState} from "react";
import Header from "./Header";
import DropDownMenu from "./DropDownMenu";
import {CurrentUserContext} from "../contexts/contexts";
import validationHelper from "../utils/ValidationHelper";
import InfoToolTip from "./InfoToolTip";


function Profile(props) {
  const currentUser = useContext(CurrentUserContext)
  const helper = validationHelper()
  const {values, handleChange, setValues, errors, onFocus} = helper;
  const [sameCheck, setSameCheck] = useState(false)

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setSameCheck(true)
    } else {
      setSameCheck(false)
    }
  }, [values, currentUser.name, currentUser.email])

  useEffect(() => {
    setValues({
      email: currentUser.email ? currentUser.email : '',
      name: currentUser.name ? currentUser.name : ''
    })
  }, [currentUser, setValues])

  const handleUpdate = () => {
    props.onUpdateUser({name: values.name, email: values.email})
  }

  return (
    <>
      <Header onIconClick={props.dropToggle}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name ? currentUser.name : ''}`}</h1>
          {errors.name && <span className="profile__valid-span">{errors.name}</span>}
          <div className="profile__edit-input">
            <div className={`profile__input-key ${errors.name ? 'profile__input-key_wrong' : ''}`}>Имя</div>
            <input className="profile__input-value"
                   type="text"
                   value={values.name}
                   onChange={handleChange}
                   onFocus={onFocus}
                   name='name'
                   autoComplete={'off'}
            />
          </div>
          <div className="profile__edit-input">
            <p className={`profile__input-key ${errors.email ? 'profile__input-key_wrong' : ''}`}>E-mail</p>
            <input className="profile__input-value"
                   type="text"
                   value={values.email}
                   name='email'
                   onChange={handleChange}
                   onFocus={onFocus}
                   autoComplete={'off'}
            />
          </div>
          {errors.email && <span className="profile__valid-span">{errors.email}</span>}
          <p className={`profile__edit ${(errors.email || errors.name || sameCheck)
            ? 'profile__edit_disabled'
            : '' }`}
             onClick={() => {
               if (errors.email || errors.name || sameCheck) {
                 return null
               } else {
                 handleUpdate()
               }
             }}>Редактировать</p>
          <p onClick={props.logout} className="profile__exit">Выйти из аккаунта</p>
        </div>
      </section>
      <DropDownMenu onCloseClick={props.dropToggle}/>
      <InfoToolTip isOpen={props.toolTip}
                   name='infoToolTip'
                   config={props.config}
                   setIsOpen={props.setToolTip}
      />
    </>
  )
}

export default Profile;