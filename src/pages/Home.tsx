import React from "react";
import "../styles/Home.scss";

const Home = () => {
  return (
    <>
      <div className="container">
        <span className="logo">z e v i</span>
        <div className="search-container">
          <input type="text" id="myInput" placeholder="Search" />
        </div>
      </div>
    </>
  );
};

export default Home;
