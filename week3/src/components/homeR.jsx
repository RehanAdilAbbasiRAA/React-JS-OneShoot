import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'


const homeR = () => {
  return (
    <>
      <NavLink to="/" > Main </NavLink>
    <div> <h1> Welcome to Book Store! </h1></div>

    </>
  )
}

export default homeR









