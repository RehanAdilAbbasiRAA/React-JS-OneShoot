import { useParams,useLocation, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Day16ProductDetails(){
  const { id } = useParams(); // string
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const {name,des,review}=location.state||{};

  useEffect(() => {
    // simulate fetching when id changes
    setProduct(null);
    const numericId = Number(id);
    const t = setTimeout(() => {
      setProduct({ id: numericId, name: `Demo Product ${numericId}`, description: "..." });
    }, 200);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h3>{name}</h3>
      <p>{des}</p>

      {/* links to nested children - RELATIVE */}
      <Link to=".">Overview</Link> | <Link to="review" state={{ name, des, review }}>Review</Link>
      <br/>

      {/* nested child (index or review) will render here */}
      <Outlet />
    </div>
  );
}
