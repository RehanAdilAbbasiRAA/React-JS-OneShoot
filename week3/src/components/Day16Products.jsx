import React from 'react'
import { Link, Outlet } from "react-router-dom";


const Day16Products = () => {
  const products =[
    {id:1,name:"Chair",des:"it is used for Sitting",review:"The Best Chair"},
    {id:2,name:"Table",des:"it is used for eating",review:"The Best Table"},
    {id:3,name:"Sofa",des:"it is used for Rest",review:"The Best Sofa"},
    {id:4,name:"Bed",des:"it is used for sleeping",review:"The Best Bed"},
    {id:5,name:"Desk",des:"it is used for Writing",review:"The Best Desk"},
    {id:6,name:"Cabinet",des:"it is used for storing",review:"The Best Cabinet"}
]
  return (
    <>
    <div>Day16Products</div>
      <div>
        <ul>
          {products.map((product)=>{
            return(
              <li key={product.id}>
                <Link to={`/products/${product.id}`}  state={{ des: product.des, review: product.review, name: product.name }}>{product.name}</Link>
              </li>
            );
          })}
        </ul>

        <Outlet/>
      </div>

      </>
    )
}

export default Day16Products