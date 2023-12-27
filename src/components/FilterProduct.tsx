import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/filter-product.scss";
import { Rating } from "react-simple-star-rating";
import { productCategory } from "../utilities/productCategoryApi";
import { fetchProducts } from "../utilities/productApi";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const FilterProduct = (props: any) => {
  const [category, setCategory] = useState<string[]>([]);
  const [products, setProducts] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string[]>([]);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);


  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  //fetch all products
  async function fetchAllProducts() {
    const items = await fetchProducts();
    setProducts(items);
  }

  //fetch all categories
  async function fetchCategories() {
    const categories = await productCategory();
    setCategory(categories);
  }

  //modify brand checkboxes changes
  const handleBrandCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((data) => data !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  //modify price check boxes
  const handlePriceCheckboxChange = (price: string) => {
    if (selectedPriceFilter.includes(price)) {
      setSelectedPriceFilter(
        selectedPriceFilter.filter((data) => data !== price)
      );
    } else {
      setSelectedPriceFilter([...selectedPriceFilter, price]);
    }
  };

  //modify rating check boxes
  const handleRatingCheckboxChange = (rating: number) => {
    if (selectedRatingFilter.includes(rating)) {
      setSelectedRatingFilter(
        selectedRatingFilter.filter((data) => data !== rating)
      );
    } else {
      setSelectedRatingFilter([...selectedRatingFilter, rating]);
    }
  };

  // Filter products based on selected categories and price filter
  useEffect(() => {
    let filteredByCategory = products;

    //update with selected brand checkboxes
    if (selectedCategories.length > 0) {
      filteredByCategory = products.filter((product: any) =>
        selectedCategories.includes(product.category)
      );
    }

    //update with selected price checkboxes
    if(selectedPriceFilter.length === 1) {
      if (selectedPriceFilter[0] === "Under500") {
        filteredByCategory = filteredByCategory.filter((product: any) => product.price < 500);
      } else if (selectedPriceFilter[0] === "1000To3000") {
        filteredByCategory = filteredByCategory.filter((product: any) => product.price >= 500);
      } 
    }

    //update with selected rating checkboxes
    if (selectedRatingFilter.length > 0) {
      filteredByCategory = filteredByCategory.filter((product: any) =>
        selectedRatingFilter.includes(Math.floor(product.rating.rate))
      );
    }

    //assign filter products
    setFilteredProducts(filteredByCategory);

  }, [selectedCategories, selectedPriceFilter, selectedRatingFilter]);

  //using lifting up state for forwarding data child component to parent component
  useEffect(() => {
    console.log("filteredProducts: ", filteredProducts);
    props.brandCheckboxes(filteredProducts);
  }, [filteredProducts]);

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <div className="brand">
            <b style={{ fontSize: 12 }}>BRAND</b>
            <ExpandMoreIcon style={{ fontSize: 12 }} />
            {/* <KeyboardArrowUpIcon style={{ fontSize: 12 }}/> */}
          </div>
          <div>
            {category.map((item: string) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={() => handleBrandCheckboxChange(item)}
                />
                <label className="checkboxes">{item}</label>
              </div>
            ))}
          </div>
        </div>

        <hr className="horizontal-line" />

        <div style={{ marginBottom: 10 }}>
          <div className="brand">
            <b style={{ fontSize: 12 }}>PRICE RANGE</b>
            <ExpandMoreIcon style={{ fontSize: 12 }} />
          </div>
          <div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedPriceFilter.includes("Under500")}
                onChange={() => handlePriceCheckboxChange("Under500")}
              />
              <label className="checkboxes" style={{ marginTop: 2 }}>
                Under 500
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectedPriceFilter.includes("1000To3000")}
                onChange={() => handlePriceCheckboxChange("1000To3000")}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                600 To 3000
              </label>
            </div>
          </div>
        </div>

        <hr className="horizontal-line" />

        <div>
          <div className="brand">
            <b style={{ fontSize: 12 }}>RATINGS</b>
            <ExpandMoreIcon style={{ fontSize: 12 }} />
          </div>
          <div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedRatingFilter.includes(5)}
                onChange={() => handleRatingCheckboxChange(5)}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={5} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedRatingFilter.includes(4)}
                onChange={() => handleRatingCheckboxChange(4)}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={4} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedRatingFilter.includes(3)}
                onChange={() => handleRatingCheckboxChange(3)}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={3} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedRatingFilter.includes(2)}
                onChange={() => handleRatingCheckboxChange(2)}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={2} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input
                type="checkbox"
                checked={selectedRatingFilter.includes(1)}
                onChange={() => handleRatingCheckboxChange(1)}
              />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={1} size={13} readonly={true} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
