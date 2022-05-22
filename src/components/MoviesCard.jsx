import React from "react";
import moviePic from '../images/card__picture.png'
import {useLocation} from "react-router-dom";

function MoviesCard() {

  const location = useLocation();

  const saveFilmHandle = (event) => {
    event.preventDefault()
    event.target.classList.add('card__button_active')
    event.target.textContent = ''
  }

  const deleteFilmHandle = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <article className="card">
        <div className="card__description">
          <h2 className="card__title">В погоне за бэнкси</h2>
          <p className="card__duration">27 минут</p>
        </div>
        <img className="card__image" src={moviePic} alt="Movie title"/>
        {location.pathname === '/movies'
          ? <button className="card__button" type={'button'} onClick={saveFilmHandle}>Сохранить</button>
          : <button className="card__button card__button_delete" type={'button'} onClick={deleteFilmHandle}/>}
      </article>

    </>
  )
}

export default MoviesCard;