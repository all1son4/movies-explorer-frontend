import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__text">&copy; 2022</p>
          <nav className="footer__links">
            <a href={'https://practicum.yandex.ru/'} target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
            <a href={'https://github.com/yandex'} target="_blank" rel="noreferrer" className="footer__link">Github</a>
            <a href={'https://www.linkedin.com/company/yandex/'} target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;