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
import completeIcon from "../images/complete_icon.svg";
import failIcon from "../images/fail_icon.svg";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [infoToolTipIsOpen, setInfoToolTipIsOpen] = useState(false);
  const [config, setConfig] = useState({
    info: '',
    icon: '',
    status: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const dropDownToggle = () => {
    document.querySelector('.drop').classList.toggle('drop_opened')
  }

  useEffect(() => {
    authApi
      .getCurrentUserInfo()
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true)
      })
      .catch(() => setLoggedIn(false))
  }, [])

  const handleUpdateUser = ({name, email}) => {
    api
      .updateUserData({name, email})
      .then((data) => {
        setInfoToolTipIsOpen(true)
        setConfig({
          info: 'Данные обновлены!',
          icon: completeIcon,
          status: 'complete'
        });
        setCurrentUser(data);
        setTimeout(() => {
          setInfoToolTipIsOpen(false)
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
        setConfig({
          info: 'Ошибка обновления данных. Попробуйте позже',
          icon: failIcon,
          status: 'fail'
        });
      })
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

    localStorage.clear()
    sessionStorage.clear()
  }

  const handleLogin = () => {
    setLoggedIn(true);
    authApi
      .getCurrentUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(err => alert(`Ошибка получения данных: ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path={'/signup'} element={
            <Register
              onLogin={handleLogin}
            />
          }/>
          <Route path={'/signin'} element={
            loggedIn
              ? <Navigate to={'/movies'}/>
              : <Login
                onLogin={handleLogin}
              />
          }/>
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Movies}
              dropToggle={dropDownToggle}
            />
          }/>
          <Route path={'/saved-movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={SavedMovies}
              dropToggle={dropDownToggle}
            />
          }/>
          <Route path={'/profile'} element={
            <ProtectedRoute
              toolTip={infoToolTipIsOpen}
              setToolTip={setInfoToolTipIsOpen}
              config={config}
              loggedIn={loggedIn}
              component={Profile}
              dropToggle={dropDownToggle}
              logout={handleLogout}
              onUpdateUser={handleUpdateUser}
            />
          }/>
          <Route path={'*'} element={<Page404/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
