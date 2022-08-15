import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchForm";
import MovieCardList from "./MoviesCardList";
import DropDownMenu from "./DropDownMenu";
import api from "../utils/MainApi";
import {durationFilterCallback, keyWordFilterCallback} from "../utils/MoviesHelper";

function SavedMovies(props) {
  const [searchValueSaved, setSearchValueSaved] = useState('');
  const [savedMovies, setSavedMovies] = useState(null)
  const [voidError, setVoidError] = useState('')
  const [isShortSaved, setIsShortSaved] = useState( false)
  const [showPreloader, setShowPreloader] = useState(false);

  const getSavedMovies = () => {
    api
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res)
        setVoidError('')
      })
      .catch((err) => {
        console.log(err)
        setVoidError('У пользователя нет сохраненных фильмов')
      })
  }

  const deleteMovie = (movie) => {
    api.deleteMovie(movie._id)
      .then(() => {
        getSavedMovies()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getSavedMovies()
  }, [])

  const toggleCheckBox = () => {
    setIsShortSaved(isShortSaved => !isShortSaved)
  }

  const searchChange = (event) => {
    setSearchValueSaved(event.target.value)
  }

  const submitSearch = (event) => {
    event.preventDefault()

    if (searchValueSaved === '') {
      setSearchValueSaved('Введите ключевое слово!')
      setTimeout(() => {
        setSearchValueSaved('')
      }, 1500)
      return
    }

    setShowPreloader(true)

    api
      .getSavedMovies()
      .then((res) => keyWordFilterCallback(res, searchValueSaved))
      .then((res) => durationFilterCallback(res, isShortSaved))
      .then(filtered => {
        setSavedMovies(filtered)
        setVoidError(filtered.length !== 0 ? '' : 'Ничего не найдено')
      })
      .finally(() => {
        setShowPreloader(false)
      })
      .catch((err) => {
        setShowPreloader(false)
        setVoidError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err)
      })
  }

  useEffect(() => {
    if (voidError === 'Ничего не найдено') {
      setTimeout(() => {
        getSavedMovies()
        setVoidError('')
        setSearchValueSaved('')
      }, 2000)
    }
  }, [voidError])

  return (
    <>
      <Header onIconClick={props.dropToggle}/>
      <SearchBox
        toggleCheck={toggleCheckBox}
        checked={isShortSaved}
        onChange={searchChange}
        onSubmit={submitSearch}
        value={searchValueSaved}
      />
      <MovieCardList
        movies={savedMovies}
        voidError={voidError}
        onDelete={deleteMovie}
        checked={isShortSaved}
        preloaderStatus={showPreloader}
      />
      <Footer/>
      <DropDownMenu onCloseClick={props.dropToggle}/>
    </>
  )
}

export default SavedMovies;