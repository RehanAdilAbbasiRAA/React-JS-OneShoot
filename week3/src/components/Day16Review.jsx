import React from 'react'
import { useLocation } from 'react-router-dom'

const Day16Review = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
    <div>Day16Review</div>
    <h2>{location.state.review}</h2>
    </>
  )
}

export default Day16Review