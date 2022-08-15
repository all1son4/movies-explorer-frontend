import React from "react";

function Checkbox(props) {
  return(
    <div className="checkbox">
      <label className="checkbox__label">
        <input type="checkbox" className="checkbox__input"checked={props.checked} onChange={props.toggleCheck}/>
        <span className="checkbox__span"/>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  )
}

export default Checkbox;