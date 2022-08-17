import React, {useContext, useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchForm";
import MovieCardList from "./MoviesCardList";
import DropDownMenu from "./DropDownMenu";
import moviesApi from '../utils/MoviesApi'
import api from "../utils/MainApi";
import {durationFilterCallback, keyWordFilterCallback} from "../utils/MoviesHelper";
import {useWidthResize} from "../utils/WidthCustomHook";
import {CurrentUserContext} from "../contexts/contexts";

function Movies(props) {
  const [searchValue, setSearchValue] = useState(JSON.parse(sessionStorage.getItem('searchValue')) || '');
  const [foundMovies, setFoundMovies] = useState(JSON.parse(sessionStorage.getItem('moviesResponse')) || null)
  const [savedMovies, setSavedMovies] = useState(JSON.parse(sessionStorage.getItem('moviesResponseSaved')) || null)
  const [showPreloader, setShowPreloader] = useState(false);
  const [isShort, setIsShort] = useState(JSON.parse(sessionStorage.getItem('checkBoxStatus')) || false)
  const [searchError, setSearchError] = useState('')
  const currentUser = useContext(CurrentUserContext)
  const [buttonLoader, setButtonLoader] = useState(false)

  const setDefaultAmountForView = () => {
    if (document.body.clientWidth < 644) return 5
    else if (document.body.clientWidth >= 644 && document.body.clientWidth < 1272) return 8
    else if (document.body.clientWidth >= 1272) return 12
  };

  const amountForView = setDefaultAmountForView();
  const [length, setLength] = useState(amountForView);
  const [count, setCount] = useState(0);
  const [loadMoreVisible, setLoadMoreVisible] = useState(foundMovies?.length > amountForView)
  const currentWidth = useWidthResize()

  const loadMore = () => {
    if (document.body.clientWidth < 644) {
      setCount(count => count + 2)
      setLoadMoreVisible(foundMovies?.length > (count + 2) + length)
    } else if (document.body.clientWidth >= 644 && document.body.clientWidth < 1272) {
      setCount(count => count + 2)
      setLoadMoreVisible(foundMovies?.length > (count + 2) + length)
    } else if (document.body.clientWidth >= 1272) {
      setCount(count => count + 3)
      setLoadMoreVisible(foundMovies?.length > (count + 3) + length)
    }
  }
  const getSavedMovies = () => {
    api
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res)
        sessionStorage.setItem('moviesResponseSaved', JSON.stringify(res))
      })
      .catch((err) => {
        console.log(err)
        sessionStorage.setItem('moviesResponseSaved', null)
      })
  }

  const savedState = (movieForSave) => {
    const findMovie = savedMovies?.find(m => m.movieId === movieForSave.id)
    if (findMovie) {
      if (findMovie.owner === currentUser._id) {
        movieForSave.isSaved = true
        return movieForSave
      } else {
        movieForSave.isSaved = false
        return movieForSave
      }
    } else {
      movieForSave.isSaved = false
      return movieForSave
    }
  }

  useEffect(() => {
    if (foundMovies) {
      setFoundMovies(foundMovies.map(savedState));
      sessionStorage.setItem('moviesResponse', JSON.stringify(foundMovies.map(savedState)))
    }
  }, [savedMovies]);

  const setDefaultView = () => {
    setCount(0)
    const view = setDefaultAmountForView()
    setLength(view)
    setLoadMoreVisible(foundMovies?.length > view)
  }

  useEffect(() => {
    setDefaultView();
  }, []);

  useEffect(() => {
    setDefaultView()
  }, [foundMovies])

  useEffect(() => {
    setDefaultView();
  }, [currentWidth]);

  const submitSearch = (event) => {
    event.preventDefault()

    if (searchValue === '') {
      setSearchValue('Введите ключевое слово!')
      setTimeout(() => {
        setSearchValue('')
      }, 1500)
      return
    }
    setShowPreloader(true)

    moviesApi
      .getMovies()
      .then((res) => keyWordFilterCallback(res, searchValue))
      .then((res) => durationFilterCallback(res, isShort))
      .then(filtered => {
        setFoundMovies(filtered)
        sessionStorage.setItem('searchValue', JSON.stringify(searchValue))
        sessionStorage.setItem('moviesResponse', JSON.stringify(filtered))
        sessionStorage.setItem('checkBoxStatus', JSON.stringify(isShort))
        setFoundMovies(filtered.map(savedState))
        sessionStorage.setItem('moviesResponse', JSON.stringify(filtered.map(savedState)))
        setSearchError(filtered.length !== 0 ? '' : 'Ничего не найдено')
      })
      .finally(() => {
        setShowPreloader(false)
      })
      .catch((err) => {
        setShowPreloader(false)
        setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err)
      })
  }

  const toggleCheckBox = () => {
    setIsShort(isShort => !isShort)
  }

  useEffect(() => {
    sessionStorage.setItem('checkBoxStatus', JSON.stringify(isShort))
  }, [isShort])

  const searchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const saveMovie = (movie) => {
    if (!movie.isSaved) {
      setButtonLoader(true)
      api
        .saveMovie(movie)
        .then(() => {
          getSavedMovies()
          movie.isSaved = true
          sessionStorage.setItem('moviesResponse', JSON.stringify(foundMovies.map(savedState)))
        })
        .finally(() => {
          setButtonLoader(false)
        })
        .catch((err) => {
          setButtonLoader(false)
          console.log(err);
        });
    } else {
      const movieForDelete = savedMovies?.find(m => m.movieId === movie.id)
      setButtonLoader(true)
      api
        .deleteMovie(movieForDelete._id)
        .then(() => {
          movie.isSaved = false
          getSavedMovies()
          if (savedMovies.length === 1) setSavedMovies(null)
          sessionStorage.setItem('moviesResponse', JSON.stringify(foundMovies.map(savedState)))
        })
        .finally(() => {
          setButtonLoader(false)
        })
        .catch((err) => {
          setButtonLoader(false)
          console.log(err);
        });
    }
  }

  return (
    <>
      <Header
        onIconClick={props.dropToggle}
      />
      <SearchBox
        toggleCheck={toggleCheckBox}
        checked={isShort}
        onChange={searchChange}
        onSubmit={submitSearch}
        value={searchValue}
      />
      {
        <MovieCardList
          length={length}
          count={count}
          loadMore={loadMore}
          loadMoreVisible={loadMoreVisible}
          checked={isShort}
          movies={foundMovies}
          preloaderStatus={showPreloader}
          error={searchError}
          saveHandler={saveMovie}
          buttonLoader={buttonLoader}
        />
      }
      <Footer/>
      <DropDownMenu
        onCloseClick={props.dropToggle}
      />
    </>
  )
}

export default Movies;