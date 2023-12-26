import React, { useEffect, useState } from "react";
import cloth from "../images/cloth.webp";
import "../styles/productCard.scss";
import { Rating } from "react-simple-star-rating";
// import Heart from "react-animated-heart";
import Heart from "@react-sandbox/heart";

const ProductCard = (props: any) => {
  const [rating, setRating] = useState(0);
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setRating(props.rating)
  }, [])

  return (
    <>
      <div className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={props.image}
          alt="Avatar"
          style={{ width: "100%", height: "32vh"}}
          className={`${isHovered ? 'hovered' : ''}`}
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
          <p>{props.title}</p>
          <p>
            <span
              style={{
                textDecoration: "line-through",
                marginRight: 2,
                color: "rgb(158, 156, 156)",
              }}
            >  
              Rs. {Math.floor(props.price+50)}
            </span>
            <span style={{ color: "rgb(84, 84, 211)", fontWeight: 600}}>
              Rs.{Math.floor(props.price)}
            </span>
          </p>
          <div style={{ marginLeft: -1.3, display: "flex"}}>
            <Rating initialValue={rating} size={13} readonly={true} />
            <span style={{ marginTop: 3, marginLeft: 2, fontSize: 9 }}>
              {(props.count)}
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