import React from "react";

function AboutProject() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h2 className="about__title">О проекте</h2>
        <div className="about__description">
          <p className="about__subtitle" style={{gridArea: "subtitle1"}}>Дипломный проект включал 5 этапов</p>
          <p className="about__subtitle" style={{gridArea: "subtitle2"}}>На выполнение диплома ушло 5 недель</p>
          <p className="about__text" style={{gridArea: "text1"}}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about__text" style={{gridArea: "text2"}}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__graphic">
          <p className="about__back-time">1 неделя</p>
          <p className="about__front-time">4 недели</p>
          <p className="about__back">Back-end</p>
          <p className="about__front">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;