import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import activeButton from "../images/card__saved-icon.svg"
import {CurrentUserContext} from "../contexts/contexts";
import ButtonLoader from "./ButtonLoader";

function MoviesCard(props) {

  const location = useLocation();
  const currentUser = useContext(CurrentUserContext)
  const [hover, setHover] = useState(false)
  const [currentCard, setCurrentCard] = useState(false)

  const linkRedirect = () => {
    window.open(`${props.link}`)
  }

  const saveMovieHandle = (event) => {
    event.preventDefault()
    props.onSave(props.movie)
    setCurrentCard(true)
    onLeave(event)
  }

  const deleteMovieHandle = (event) => {
    event.preventDefault()
    props.onDelete(props.movie)
    setCurrentCard(true)
  }

  const onOver = () => {
    setHover(true)
  }

  const onLeave = () => {
    setHover(false)
  }

  useEffect(() => {
    if (!props.buttonLoader) {
      setCurrentCard(false)
      onLeave()
    }
  }, [props.buttonLoader])

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
                      type={'button'}
                      onClick={saveMovieHandle}
                      onMouseOver={onOver}
                      onMouseLeave={onLeave}
                      disabled={props.buttonLoader & currentCard}
            >
              {props.buttonLoader && currentCard
                ? <ButtonLoader/>
                : !props.movie.isSaved
                  ? 'Сохранить'
                  : hover && props.movie.isSaved
                    ? 'Удалить'
                    : <img src={activeButton} alt={'Галочка'} className={'card__button_active-image'}/>
              }
            </button>
            : props.movie.owner === currentUser._id &&
            <button className={`card__button ${props.buttonLoader && currentCard ? '' : 'card__button_delete'}`}
                    type={'button'}
                    onClick={deleteMovieHandle}
                    disabled={props.buttonLoader && currentCard}
            >
              {props.buttonLoader && currentCard && <ButtonLoader/>}
            </button>}
        </div>
      </article>

    </>
  )
}

export default MoviesCard;