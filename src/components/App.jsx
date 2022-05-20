import React from "react";
import { Route, Routes} from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Page404 from "./Page404";
import Register from "./Register";
import Login from "./Login";

function App () {

  const dropDownToggle = () => {
    document.querySelector('.drop').classList.toggle('drop_opened')
  }

  return (
    <div>
      <Routes>
        <Route path={'/signin'} element={<Login />}/>
        <Route path={'/signup'} element={<Register />}/>
        <Route path={'/'} element={<Main />} />
        <Route path={'/movies'} element={<Movies dropToggle={dropDownToggle}/>}/>
        <Route path={'saved-movies'} element={<SavedMovies dropToggle={dropDownToggle}/>}/>
        <Route path={'/profile'} element={<Profile dropToggle={dropDownToggle}/>}/>
        <Route path={'*'} element={<Page404 />}/>
      </Routes>
    </div>
  )
}

export default App;
