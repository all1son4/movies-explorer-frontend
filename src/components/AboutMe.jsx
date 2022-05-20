import React from "react";
import photo from '../images/me__photo.png'

function AboutMe() {
  return (
    <section className="me">
      <div className="me__container">
        <h2 className="me__title">Студент</h2>
        <div className="me__info">
          <div className="me__description">
            <h3 className="me__name">Дмитрий</h3>
            <p className="me__short">Фронт-энд разработчик, 24 года</p>
            <p className="me__bio">Родился и живу в Минске. Закончил Белорусский государственный университет информатики и радиоэлектроники. В процессе обучения
                                    начал рабоать React-разработчиком в аутстафф компании. Очень рад был уйти с предыдущего места работы, а этот дипломный проект
                                    уже приходилось доделывать в параллели с боевыми проектами.</p>
            <nav className="me__navi">
              <a className="me__link" href={'https://www.linkedin.com/in/dmitry-strok-3220a0181/'} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="me__link" href={'https://github.com/all1son4'} target="_blank" rel="noreferrer">Github</a>
            </nav>
          </div>
          <img className="me__photo" src={photo} alt="developer"/>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;