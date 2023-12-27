import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/filter-product.scss";
import { Rating } from "react-simple-star-rating";
import { productCategory } from "../utilities/productCategoryApi";
import { fetchProducts } from "../utilities/productApi";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const FilterProduct = (props: any) => {
  const [category, setCategory] = useState<string[]>([]);
  const [products, setProducts] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string[]>([]);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number[]>(
    []
  );
  const [filteredProducts, setFilteredProducts] = useState<any>([]);

  // test
  const [toggleArrowBrand, setToggleArrowBrand] = useState(true);
  const [toggleArrowPrice, setToggleArrowPrice] = useState(true);
  const [toggleArrowRating, setToggleArrowRating] = useState(true);

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
    if (selectedPriceFilter.length === 1) {
      if (selectedPriceFilter[0] === "Under500") {
        filteredByCategory = filteredByCategory.filter(
          (product: any) => product.price < 500
        );
      } else if (selectedPriceFilter[0] === "1000To3000") {
        filteredByCategory = filteredByCategory.filter(
          (product: any) => product.price >= 500
        );
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
    props.brandCheckboxes(filteredProducts);
  }, [filteredProducts]);

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <div
            className="brand"
            onClick={() => setToggleArrowBrand(!toggleArrowBrand)}
          >
            <b style={{ fontSize: 12 }}>BRAND</b>
            {toggleArrowBrand ? (
              <ExpandMoreIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            )}
          </div>
          <div>
            {toggleArrowBrand &&
              category.map((item: string, index: number) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item)}
                    onChange={() => handleBrandCheckboxChange(item)}
                    id={`brand-${index}`}
                  />
                  <label className="checkboxes" htmlFor={`brand-${index}`}>
                    {item}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <hr className="horizontal-line" />

        <div style={{ marginBottom: 10 }}>
          <div
            className="brand"
            onClick={() => setToggleArrowPrice(!toggleArrowPrice)}
          >
            <b style={{ fontSize: 12 }}>PRICE RANGE</b>
            {toggleArrowPrice ? (
              <ExpandMoreIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            )}
          </div>

          <div>
            {toggleArrowPrice && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceFilter.includes("Under500")}
                    onChange={() => handlePriceCheckboxChange("Under500")}
                    id="price-1"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 2 }}
                    htmlFor="price-1"
                  >
                    Under 500
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedPriceFilter.includes("1000To3000")}
                    onChange={() => handlePriceCheckboxChange("1000To3000")}
                    id="price-2"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="price-2"
                  >
                    600 To 3000
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="horizontal-line" />

        <div>
          <div
            className="brand"
            onClick={() => setToggleArrowRating(!toggleArrowRating)}
          >
            <b style={{ fontSize: 12 }}>RATINGS</b>
            {toggleArrowRating ? (
              <ExpandMoreIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            )}
          </div>
          <div>
            {toggleArrowRating && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatingFilter.includes(5)}
                    onChange={() => handleRatingCheckboxChange(5)}
                    id="rating-5"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="rating-5"
                  >
                    <Rating initialValue={5} size={13} readonly={true} />
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatingFilter.includes(4)}
                    onChange={() => handleRatingCheckboxChange(4)}
                    id="rating-4"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="rating-4"
                  >
                    <Rating initialValue={4} size={13} readonly={true} />
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatingFilter.includes(3)}
                    onChange={() => handleRatingCheckboxChange(3)}
                    id="rating-3"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="rating-3"
                  >
                    <Rating initialValue={3} size={13} readonly={true} />
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatingFilter.includes(2)}
                    onChange={() => handleRatingCheckboxChange(2)}
                    id="rating-2"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="rating-2"
                  >
                    <Rating initialValue={2} size={13} readonly={true} />
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRatingFilter.includes(1)}
                    onChange={() => handleRatingCheckboxChange(1)}
                    id="rating-1"
                  />
                  <label
                    className="checkboxes"
                    style={{ marginTop: 4 }}
                    htmlFor="rating-1"
                  >
                    <Rating initialValue={1} size={13} readonly={true} />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
