import React from "react";

import promoLogo from '../images/promo__logo.svg'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href={'#about'}><button type={"button"} className="promo__button">Узнать больше</button></a>
        </div>
        <a href={'#about'}><img className="promo__logo" src={promoLogo} alt="promo logo"/></a>
      </div>
    </section>
  )
}

export default Promo;