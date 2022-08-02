class Api {
  constructor({endpoint, headers}) {
    this._endpoint = endpoint;
    this._headers = headers;
  }

  getResponseData = (res) => {
    if (res.ok) {
      return res.json().then(j => Promise.resolve(j));
    } else {
      return Promise.reject(`${res.status}`);
    }
  }

  headers() {
    return {
      ...this._headers,
      'authorization': `Bearer${localStorage.getItem('jwt')}`
    }
  }

  // getUserData() {
  //   return fetch(`${this._endpoint}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     credentials: 'include',
  //   })
  //     .then(res => this.getResponseData(res))
  // }

  getSavedMovies() {
    return fetch(`${this._endpoint}/movies`, {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => this.getResponseData(res))
  }

  updateUserData({name, email}) {
    return fetch(`${this._endpoint}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(res => this.getResponseData(res))
  }

  saveMovie(movie) {
    return fetch(`${this._endpoint}/movies`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
        country: movie.country || ' ',
        year: movie.year,
        duration: movie.duration,
        description: movie.description,
        director: movie.director,
        trailerLink: movie.trailerLink,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`
      })
    })
      .then(res => this.getResponseData(res))
  }

  deleteMovie(id) {
    return fetch(`${this._endpoint}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(res => this.getResponseData(res))
  }

  // signin({email, password}) {
  //   return fetch(`${this._endpoint}/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       email,
  //       password
  //     })
  //   })
  //     .then(res => this.getResponseData(res))
  // }

  // signup({name, email, password}) {
  //   return fetch(`${this._endpoint}/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password
  //     })
  //   })
  //     .then(res => this.getResponseData(res))
  // }

  // checkToken() {
  //   return fetch(`${this._endpoint}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //   })
  //     .then(res => this.getResponseData(res))
  // }
}

const
  api = new Api({
    endpoint: 'https://api.movieexplorer.allison.nomoredomains.work',
  })

export default api