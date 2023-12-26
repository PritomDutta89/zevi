import React, { useState, useEffect } from "react";
import SearchComponent from "../components/SearchComponent";
import "../styles/products.scss";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utilities/productApi";
import FilterProduct from "../components/FilterProduct";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    //fetch all products
    const items = await fetchProducts();
    setProducts(items);
  }

  return (
    <>
      <SearchComponent searchBarTop={false} logoTop={false} />
      <div className="product-container">
        <h2 style={{ marginBottom: 15 }}>Search Results</h2>
        <div
          style={{
            display: "flex",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          <div
            style={{
              width: "13%"
            }}
          >
            <FilterProduct/>
          </div>
          <div
            className="all-products"
            style={{
              width: "82%",
              marginLeft: "15PX"
            }}
          >
            {products.map((product: any) => (
              <ProductCard
                image={product.image}
                title={product.category}
                rating={product.rating.rate}
                count={product.rating.count}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
