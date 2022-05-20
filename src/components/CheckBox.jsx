import React from "react";

function Checkbox() {
  return(
    <div className="checkbox">
      <label className="checkbox__label">
        <input type="checkbox" className="checkbox__input"/>
        <span className="checkbox__span"/>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  )
}

export default Checkbox;