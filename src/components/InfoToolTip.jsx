import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function InfoToolTip(props) {
  const navigate = useNavigate()

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
      props.setIsOpen(false);
    }
  }

  const handleClose = useCallback(
    () => {
      props.setIsOpen(false);
    }, [props]
  )

  useEffect(() => {
    if (props.isOpen) {
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [props.isOpen, handleClose]);

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container popup__container_info">
        <img src={props.config.icon} alt="инфоиконка" className="popup__icon"/>
        <h2 className="popup__info">{props.config.info}</h2>
        {props.config.status === 'complete' && <button type='button'
                                                       onClick={
                                                         () => {
                                                          props.setIsOpen(false)
                                                           setTimeout(() => {
                                                             navigate('/signin')
                                                           }, 800)
                                                         }
                                                       }>Выполнить вход</button>}
      <button type="button" className="popup__close-button" onClick={handleClose}/>
      </div>
    </div>
  )
}

export default InfoToolTip