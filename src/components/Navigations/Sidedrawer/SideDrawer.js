import React from 'react'
import './SideDrawer.css'
import aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'
const SideDrawer = () => {
  return (
     <aux>
    <Backdrop show={true} clicked={} />  
    <div className="sideDrawer">
      <h1>Burger Builder</h1>
      <nav>
          ...
      </nav>
    </div>
    </aux> 
  )
}

export default SideDrawer
