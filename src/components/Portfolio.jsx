import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href={'http://howtolearn.surge.sh/'} target="_blank" rel="noreferrer" className="portfolio__item-link">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href={'http://russiantravel.surge.sh/'} target="_blank" rel="noreferrer" className="portfolio__item-link">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a href={'https://mestoofallison.nomoredomains.work/'} target="_blank" rel="noreferrer" className="portfolio__item-link">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;