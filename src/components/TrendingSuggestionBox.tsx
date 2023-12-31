import React, {useEffect, useState} from "react";
import "../styles/trendingItems.scss";
import TrendingCards from "./TrendingCards";
import { Link } from "react-router-dom";
import { fetchProducts } from "../utilities/productApi";
import { productCategory } from "../utilities/productCategoryApi";

const TrendingSuggestionBox = () => {
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    fetchAllProducts();
    fetchCategories();
  }, []);

  async function fetchAllProducts() {
    //fetch all products
    const items = await fetchProducts();
    setProducts(items);

    //use for trending products
    setTrendingProducts(items.slice(0, 5));
  }

  async function fetchCategories()
  {
    //fetch all categories
    const categories = await productCategory();

    if(categories.length===0)
    {
      alert("Error fetching products.....Please refresh the page")
    }

    setCategory(categories);
  }

  const customLinkStyle = {
    textDecoration: 'none',
    color: 'inherit', // Use the default text color
  };

  return (
    <>
      <div className="trending-container">
        <div className="trending-box">
          <div className="trending-products">
            <div className="trending-items">
              <h5>Latest Trends</h5>
              
              <div className="trending-cards">
                {
                    trendingProducts.map((item: any, index: number )=>(
                      <TrendingCards items={item} key={index}/>
                    ))
                }
              </div>
            </div>
            <div>
                <h5>Popular suggestions</h5>
                <ul className="trending-lists">
                    {
                        category.map((item: string, index: number)=>(
                            <Link to={'/products'} style={customLinkStyle} key={index}><li className="list" >{item}</li></Link>
                        ))
                    }
                </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingSuggestionBox;
