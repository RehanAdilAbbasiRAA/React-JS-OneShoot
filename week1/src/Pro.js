import React from "react";
import PropTypes from "prop-types";

function Pro({ title, price, inStock, tags }) {
  // ✅ Manually check types and warn
  if (typeof title !== "string") console.error("title should be a string!", title);
  if (typeof price !== "number") console.error("price should be a number!", price);
  if (typeof inStock !== "boolean") console.error("inStock should be a boolean!", inStock);
  if (typeof tags !== "string") console.error("tags should be a string!", tags);

  return (
    <div style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
      <h1>Title: {title}</h1>
      <div>
        <h3>
          Price: {price} | InStock: {inStock ? "✅ Yes" : "❌ No"} | Tags: {tags}
        </h3>
      </div>
    </div>
  );
}

// Default props
Pro.defaultProps = {
  title: "Default Title",
  price: 0,
  inStock: false,
  tags: "No Tags",
};

// PropTypes
Pro.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  inStock: PropTypes.bool,
  tags: PropTypes.string,
};

export default Pro;
