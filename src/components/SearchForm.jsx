import React from "react";
import Checkbox from "./CheckBox";
import magni from '../images/search__magni.svg'

function SearchBox(props) {
  return (
    <section className={"search"}>
      <div className={"search__container"}>
        <div className={"search__wrap"}>
          <div className="search__background-wrap">
            <form className={"search__form"}>
              <img src={magni} alt="search" className="search__magni"/>
              <input className={"search__input"} placeholder={`Фильм`} value={props.value} onChange={props.onChange}
                     required/>
              <button type={'submit'} className={"search__button"} onClick={props.onSubmit}>Найти</button>
            </form>
            <Checkbox/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBox;