class MoviesApi {
  constructor({address, headers}) {
    this._address = address
    this._headers = headers
  }

  _status(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.code} -> ${res.message}`);
    }
  }

  getMovies() {
    return fetch(`${this._address}`, {
      headers: this._headers,
    })
      .then(this._status);
  }
}

const moviesApi = new MoviesApi({
  address: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-type': 'application/json'
  }
})

export default moviesApi
