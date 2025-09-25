// src/components/ProductCard/ProductCardStyled.js
import styled from "styled-components";

const Card = styled.div`
  padding: 20px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.primary ? "#f0f8ff" : "#fff")};
  border: 1px solid #ccc;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: larger;
  font-weight: bolder;
  margin: 10px;
`;

const Price = styled.span`
  font-size: small;
  font-weight: 500;
  margin: 10px;
`;

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: small;
  font-weight: 900;
  text-align: center;
  color: white;
  background-color: ${(props) => (props.inStock ? "green" : "red")};
`;

function ProductCardStyled({ title = "not given", price = 100, inStock = false, primary = false }) {
  return (
    <Card primary={primary}>
      <Title>{title}</Title>
      <Price>RS {price}</Price>
      <Badge inStock={inStock}>{inStock ? "In Stock" : "Out of Stock"}</Badge>
    </Card>
  );
}

export default ProductCardStyled;
