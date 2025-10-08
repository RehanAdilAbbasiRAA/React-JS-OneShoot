import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'

const LayoutR = () => {
  return (
    <>

    <div>we are On layout Component </div>
      <header style={{ padding: 12 }}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>
          Books
        </NavLink>
      </header>
    

        <main style={{ padding: 12 }}>
                <Outlet />
            </main>

    </>
  )
}

export default LayoutR