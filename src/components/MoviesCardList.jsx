import React from "react";
import MoviesCard from "./MoviesCard";
import {useLocation} from "react-router-dom";

function MovieCardList() {
  const location = useLocation();

  return (
    <section className="cards">
      <div className="cards__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <div className={location.pathname === '/movies' ? "cards__button-box" : "cards__button-box cards__button-box_void"}>
        {(location.pathname === '/movies') && <button className="cards__button-more">Ещё</button>}
      </div>
    </section>
  )
}

export default MovieCardList;