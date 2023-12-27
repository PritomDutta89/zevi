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

  function filterBrandCheckboxes(data: any) {
    setProducts(data);
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
          <div className="filter-width">
            <FilterProduct brandCheckboxes={filterBrandCheckboxes} />
          </div>
          <div
            className="all-products"
          >
            {products.map((product: any, index:number) => (
              <ProductCard
                image={product.image}
                title={product.category}
                rating={product.rating.rate}
                count={product.rating.count}
                price={product.price}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
