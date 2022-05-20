import React from "react";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__description">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <div className="techs__skills">
            <p className="techs__skill">HTML</p>
            <p className="techs__skill">CSS</p>
            <p className="techs__skill">JS</p>
            <p className="techs__skill">React</p>
            <p className="techs__skill">Git</p>
            <p className="techs__skill">Express.js</p>
            <p className="techs__skill">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Techs;