import React from "react";
import "../styles/trendingItems.scss";
import { Link } from "react-router-dom";

const TrendingCards = (props: any) => {
  const customLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className="card">
        <Link to={"/products"} style={customLinkStyle}>
          <img
            src={props.items.image}
            alt="Avatar"
            className="trending-product-image"
          />
          <div className="card-container">
            <p>{props.items.category}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TrendingCards;
