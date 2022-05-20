import React from "react";
import Checkbox from "./CheckBox";
import magni from '../images/search__magni.svg'

function SearchBox() {
  return (
    <section className={"search"}>
      <div className={"search__container"}>
        <div className={"search__wrap"}>
          <div className="search__background-wrap">
            <form className={"search__form"}>
              <img src={magni} alt="search" className="search__magni"/>
              <input className={"search__input"} placeholder={`Фильм`} required/>
              <button className={"search__button"}>Найти</button>
            </form>
            <Checkbox />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBox;