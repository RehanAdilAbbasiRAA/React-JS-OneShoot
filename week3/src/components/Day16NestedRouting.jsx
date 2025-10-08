import { useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";


const Day16NestedRouting = () => {
  return (
    <>    
        <div>Day16NestedRouting</div>
        <div>

          <Outlet />
        </div>

    </>

  )
}

export default Day16NestedRouting


// rafce 