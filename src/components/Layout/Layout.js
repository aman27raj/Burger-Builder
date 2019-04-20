import React from 'react'
import Aux from '../../hoc/Aux'
import './Layout.css'
import Toolbar from '../Navigations/Toolbar/Toolbar';
// import SideDrawer from '../Navigations/Sidedrawer/SideDrawer';
const Layout = (props) => {
  return (
    <Aux>
        {/* <div>Toolbar Side_Drawer BAckdrop</div> */}
        <Toolbar/>
        {/* <SideDrawer/> */}
        <main className="content">
            {props.children}
        </main>
    </Aux>
  )
}

export default Layout
