import React, {useEffect, useState} from "react";
import MoviesCard from "./MoviesCard";
import {useLocation} from "react-router-dom";
import Preloader from "./Preloader";

function MovieCardList(props) {
  const location = useLocation();

  return (
    <section className="cards">
      {!props.preloaderStatus
        ? <div className="cards__container">
          {props.moviesList?.map((f) => {
            return <MoviesCard key={f.id} title={f.nameRU} duration={f.duration} image={f.image.url}/>
          })}
        </div>
        : <Preloader status={props.preloaderStatus}/>}
      <div
        className={location.pathname === '/movies' ? "cards__button-box" : "cards__button-box cards__button-box_void"}>
        {(location.pathname === '/movies' && props.moviesList.length !== 0) &&
        <button className="cards__button-more">Ещё</button>}
      </div>
    </section>
  )
}

export default MovieCardList