import React from 'react'

function Preloader(props) {
    return (
        <div className={`preloader ${props.status ? "preloader_showed" : ""}`}>
            <div className="preloader__container">
                <span className="preloader__round"/>
            </div>
        </div>
    )
}

export default Preloader
