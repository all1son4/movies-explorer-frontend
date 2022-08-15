import React, {useContext} from "react";
import {useLocation} from "react-router-dom";
import activeButton from "../images/card__saved-icon.svg"
import {CurrentUserContext} from "../contexts/contexts";

function MoviesCard(props) {

  const location = useLocation();
  const currentUser = useContext(CurrentUserContext)

  const linkRedirect = () => {
    window.open(`${props.link}`)
  }

  const saveMovieHandle = (event) => {
    event.preventDefault()
    props.onSave(props.movie)
  }

  const deleteMovieHandle = (event) => {
    event.preventDefault()
    console.log(props.movie)
    props.onDelete(props.movie)
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
        <img
          className="card__image"
          src={location.pathname === '/saved-movies' ? props.image : `https://api.nomoreparties.co${props.image}`}
          alt="Movie title"
          onClick={linkRedirect}
        />
        <div className={'card__button-box'}>
          {location.pathname === '/movies'
            ? <button className={`card__button ${props.movie.isSaved ? 'card__button_active' : ''}`}
                      type={'button'} onClick={saveMovieHandle}>{props.movie.isSaved ? <img src={activeButton} alt={'Галочка'} className={'card__button_active-image'}/> : 'Сохранить'}</button>
            : props.movie.owner === currentUser._id && <button className="card__button card__button_delete" type={'button'} onClick={deleteMovieHandle}/>}
        </div>
      </article>

    </>
  )
}

export default MoviesCard;