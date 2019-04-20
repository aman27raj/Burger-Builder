import React from 'react'
import image from '../../../assets/Images/burger-logo.png'
import './Toolbar.css'
const Toolbar = () => {
  return (
    <div className='toolbar'>
        <div>HOME</div>
        <div className="logo"><img src={image}></img></div>
        <nav>
            .....
        </nav>
    </div>
  )
}

export default Toolbar
