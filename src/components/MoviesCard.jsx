import React from "react";
import {useLocation} from "react-router-dom";

function MoviesCard(props) {

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
          <h2 className="card__title">{props.title}</h2>
          <p
            className="card__duration">{props.duration} {props.duration.toString().slice(-1) === '2'
                                                        || props.duration.toString().slice(-1) === '3'
                                                        || props.duration.toString().slice(-1) === '4'
                                                        ? "минуты"
                                                        : props.duration.toString().slice(-1) === '1'
                                                        ? "минута" : "минут"}</p>
        </div>
        <img className="card__image" src={`https://api.nomoreparties.co${props.image}`} alt="Movie title"/>
        {location.pathname === '/movies'
          ? <button className="card__button" type={'button'} onClick={saveFilmHandle}>Сохранить</button>
          : <button className="card__button card__button_delete" type={'button'} onClick={deleteFilmHandle}/>}
      </article>

    </>
  )
}

export default MoviesCard;