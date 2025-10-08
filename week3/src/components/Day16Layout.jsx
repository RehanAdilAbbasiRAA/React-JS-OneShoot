import React from 'react'
import { NavLink, Outlet } from "react-router-dom";

const Day16Layout = () => {
  return (
    <>
    <div>Day16Layout</div>
    <div>
        <header> 
          <NavLink to="/">  Home</NavLink> |<NavLink to="/products">  Products</NavLink>
        </header>

        <main>
          <Outlet />
        </main>
    </div>
    </>
  )

}

export default Day16Layout