import React, { useState } from "react";
import "../styles/search.scss";
import TrendingSuggestionBox from "./TrendingSuggestionBox";
import { Link } from "react-router-dom";

const SearchComponent = (props: any) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 1000);
  };

  const customLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      {props.logoTop ? (
        <div className="container">
          <span className="logo">
            <Link to={"/"} style={customLinkStyle}>
              z e v i
            </Link>
          </span>
          <div className="search-container">
            <input
              type="text"
              id="myInput"
              placeholder="Search"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {isInputFocused && <TrendingSuggestionBox />}
        </div>
      ) : (
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <div className="container-product">
            <span className="logo-product">
              <Link to={"/"} style={customLinkStyle}>
                z e v i
              </Link>
            </span>
            <div className="search-container-product">
              <input
                type="text"
                id="myInputProduct"
                placeholder="Search"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
          {isInputFocused && <TrendingSuggestionBox />}
        </div>
      )}
    </>
  );
};

export default SearchComponent;
