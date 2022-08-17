import React, {useEffect, useState} from "react";
import MoviesCard from "./MoviesCard";
import {useLocation} from "react-router-dom";
import Preloader from "./Preloader";
import {durationFilterCallback} from "../utils/MoviesHelper";

function MovieCardList(props) {
  const location = useLocation();
  const [forRender, setForRender] = useState(null)

  useEffect(() => {
    setForRender(props.movies)
  }, [props.movies])

  useEffect(() => {
    setForRender(durationFilterCallback(props.movies, props.checked))
  }, [props.checked])

  return (
    <section className="cards">
      {!props.preloaderStatus
        ? props.error || props.voidError
          ? <div className={'cards__error-block'}>{props.error || props.voidError}</div>
          : <div className="cards__container">
            {location.pathname === '/movies' &&
              forRender?.slice(0, (props.count + props.length)).map((movie) => {
                return <MoviesCard key={movie.id}
                                   movie={movie}
                                   title={movie.nameRU || movie.nameEN}
                                   duration={movie.duration}
                                   image={movie.image.url}
                                   link={movie.trailerLink}
                                   onSave={props.saveHandler}
                                   buttonLoader={props.buttonLoader}
                />
              })}
            {location.pathname === '/saved-movies' && forRender?.map((movie, i) => {
                return <MoviesCard key={`${movie.movieId}/${movie.owner}/${i}`}
                                   movie={movie}
                                   title={movie.nameRU || movie.nameEN}
                                   duration={movie.duration}
                                   image={movie.image}
                                   link={movie.trailerLink}
                                   onDelete={props.onDelete}
                                   buttonLoader={props.buttonLoader}
                />
              })}
          </div>
        : <Preloader status={props.preloaderStatus}/>}
      <div
        className={`cards__button-box ${location.pathname === '/movies' ? '' : 'cards__button-box_void'}`}>
        {(location.pathname === '/movies' && props.loadMoreVisible && !props.error && !props.preloaderStatus) &&
        <button className="cards__button-more" onClick={props.loadMore}>Ещё</button>}
      </div>
    </section>
  )
}

export default MovieCardList