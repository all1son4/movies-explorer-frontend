import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchForm";
import MovieCardList from "./MoviesCardList";
import DropDownMenu from "./DropDownMenu";

function Movies(props) {

  return (
    <>
      <Header onIconClick={props.dropToggle}/>
      <SearchBox />
      <MovieCardList />
      <Footer/>
      <DropDownMenu onCloseClick={props.dropToggle}/>
    </>
  )
}

export default Movies;