import PropTypes from "prop-types";
// function ProductCards(
//     {title="Test", price=0, inStock=false, tags="no"}
// ProductCards.js

function ProductCards(
    {title="Test", price=0, inStock=false, tags="no"}
) {
  return (
    <div style={{ border: "1px solid green", margin: "10px", padding: "10px", borderRadius: "8px" }}>
      <h1>Title : {title}</h1>
      <div>
        <h3>
          Price : {price} | InStock : {inStock ? "✅ Yes" : "❌ No"} | <b>Tags : {tags}</b>
        </h3>
      </div>
    </div>
  );
}

// ✅ Default props
ProductCards.defaultProps = {
  title: "Default Title",
  price: 0,
  inStock: false,
  tags: "No Tags",
};

// ✅ PropTypes
ProductCards.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  inStock: PropTypes.bool,
  tags: PropTypes.string,
};

export default ProductCards;
