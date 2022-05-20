import React from "react";
import moviePic from '../images/card__picture.png'

function MoviesCard() {

  const saveFilmHandle = (event) => {
    event.preventDefault()
    console.log(1)
    event.target.classList.add('card__button_active')
    event.target.textContent = ''
  }

  return (
    <>
      <article className="card">
        <div className="card__description">
          <h2 className="card__title">В погоне за бэнкси</h2>
          <p className="card__duration">27 минут</p>
        </div>
        <img className="card__image" src={moviePic} alt="Movie title"/>
        <button className="card__button" type={'button'} onClick={saveFilmHandle}>Сохранить</button>
      </article>

    </>
  )
}

export default MoviesCard;