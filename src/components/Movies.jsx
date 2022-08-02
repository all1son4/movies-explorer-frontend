import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchForm";
import MovieCardList from "./MoviesCardList";
import DropDownMenu from "./DropDownMenu";
import moviesApi from '../utils/MoviesApi'
import api from "../utils/MainApi";

function Movies(props) {

  const [searchValue, setSearchValue] = useState('');
  const [foundedMovies, setFoundedMovies] = useState({keyWord: '', resArr: []});
  const [showPreloader, setShowPreloader] = useState(false);

  const submitSearch = (event) => {
    event.preventDefault()
    setShowPreloader(true)
    try {
      moviesApi.getMovies().then(res => setFoundedMovies({
        keyWord: searchValue,
        resArr: res
      })).finally(() => {
        setShowPreloader(false)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const searchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const saveMovie = (movie) => {
    api
      .saveMovie(movie)
      .then(res => console.log(res))
      .catch(err => alert(`Ошибка сохранения фильма: ${err}`))
  }


  return (
    <>
      <Header
        onIconClick={props.dropToggle}
      />
      <SearchBox
        onChange={searchChange}
        onSubmit={submitSearch}
        value={searchValue}
      />
      {
        <MovieCardList
        moviesList={foundedMovies.resArr}
        keyWord={foundedMovies.keyWord}
        preloaderStatus={showPreloader}
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