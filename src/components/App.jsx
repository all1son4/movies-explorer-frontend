import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Page404 from "./Page404";
import Register from "./Register";
import Login from "./Login";
import {CurrentUserContext} from "../contexts/contexts";
import api from "../utils/MainApi";
import * as authApi from "../utils/authApi";
import ProtectedRoute from "./ProtectedRoute";
import {CookiesProvider} from "react-cookie";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loginCheck, setLoginCheck] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [updated, setUpdated] = useState(false)
  // const user = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate();

  const dropDownToggle = () => {
    document.querySelector('.drop').classList.toggle('drop_opened')
  }



  useEffect(() => {
    authApi
      .getCurrentUserInfo()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false))
  }, [])

  useEffect(() => {
    if (!loggedIn) return
    authApi
      .getCurrentUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(err => alert(`Ошибка получения данных: ${err}`))
  }, [loggedIn])

  function handleUpdateUser({ name, email }) {

    api
      .updateUserData({ name, email })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => alert(`Ошибка обновления данных: ${err}`))
  }

  const handleLogout = (event) => {
    event.preventDefault()

    authApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/signin');
      })
      .catch(err => alert(`Ошибка попытки выхода: ${err}`))
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const deleteMovie = (id) => {
    api
      .deleteMovie(id)
      .then(res => console.log(res))
      .catch(err => alert(`Ошибка удаления фильма: ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CookiesProvider>
        <div>
          <Routes>
            <Route path={'/signup'} element={
              // !loggedIn
              //   ?
              <Register registerError={registerError}/>
              // : <Navigate to={'/'}/>
            }/>
            <Route path={'/signin'} element={
              loggedIn
                ? <Navigate to={'/movies'}/>
                : <Login
                  // setLoggedIn={setLoggedIn}
                  //        setLoginCheck={setLoginCheck}
                  //        setLoginError={setLoginError}
                  //        loginError={loginError}
                  onLogin={handleLogin}
                />
            }/>
            <Route path={'/'} element={<Main/>}/>

            <Route path={'/movies'} element={
              // loggedIn
              //   ? <Movies dropToggle={dropDownToggle}
              //             loggedIn={loggedIn}
              //   />
              //   : <Navigate to={'/'}/>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                dropToggle={dropDownToggle}
                onDelete={deleteMovie}
              />
            }/>
            <Route path={'/saved-movies'} element={
              // loggedIn
              //   ? <SavedMovies dropToggle={dropDownToggle}
              //                  loggedIn={loggedIn}
              //   />
              //   : <Navigate to={'/'}/>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                dropToggle={dropDownToggle}
                onDelete={deleteMovie}
              />
            }/>
            {/*{loginCheck &&*/}
            <Route path={'/profile'}
                   element={
                     // loggedIn
                     // ? <Profile dropToggle={dropDownToggle}
                     //            loggedIn={loggedIn}
                     //            email={email}
                     //            // updateUser={handleUpdateUser}
                     //            logout={handleLogout}
                     //            updated={updated}
                     //            setUpdated={setUpdated}
                     // />
                     // : <Navigate to={'/'}/>
                     <ProtectedRoute
                       loggedIn={loggedIn}
                       component={Profile}
                       dropToggle={dropDownToggle}
                       logout={handleLogout}
                       onUpdateUser={handleUpdateUser}
                     />
                   }/>
            {/*}*/}
            <Route path={'*'} element={<Page404/>}/>
          </Routes>
        </div>
      </CookiesProvider>
    </CurrentUserContext.Provider>
  )
}

export default App;
