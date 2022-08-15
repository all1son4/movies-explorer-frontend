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
              <input
                className={`search__input ${props.value === 'Введите ключевое слово!' ? 'search__input_error' : ''}`}
                placeholder={`Фильм`}
                value={props.value}
                onChange={props.onChange}
                autoComplete={'off'}
                disabled={props.value === 'Введите ключевое слово!'}
              />
              <button type={'submit'} className={"search__button"} onClick={props.onSubmit}>Найти</button>
            </form>
            <Checkbox
              checked={props.checked}
              toggleCheck={props.toggleCheck}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBox;