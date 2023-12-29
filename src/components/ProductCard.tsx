import React, { useEffect, useState } from "react";
import "../styles/productCard.scss";
import { Rating } from "react-simple-star-rating";
import Heart from "@react-sandbox/heart";

const ProductCard = (props: any) => {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={props.image}
          alt="Avatar"
          style={{ width: "100%", height: "32vh" }}
          className={`${isHovered ? "hovered" : ""}`}
        />
        <div className="heart">
          <Heart
            width={20}
            height={20}
            active={active}
            onClick={() => setActive(!active)}
            className="heart-icon"
          />
        </div>
        <div className="product-card-container">
          <b style={{ textTransform: "capitalize" }}>{props.title}</b>
          <p>
            <span
              style={{
                textDecoration: "line-through",
                marginRight: 2,
                color: "rgb(158, 156, 156)",
              }}
            >
              Rs. {Math.floor(props.price + 50)}
            </span>
            <span style={{ color: "rgb(84, 84, 211)", fontWeight: 600 }}>
              Rs.{Math.floor(props.price)}
            </span>
          </p>
          <div style={{ marginLeft: -1.3, display: "flex" }}>
            <Rating initialValue={Math.ceil(props.rating)} size={13} readonly={true} />
            <span style={{ marginTop: 3, marginLeft: 2, fontSize: 9 }}>
              {props.count}
            </span>
          </div>
        </div>
        {isHovered && (
          <div className="view-product-popup">
            <p>View Product</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
