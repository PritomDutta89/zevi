import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/filter-product.scss";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "react-simple-star-rating";
import { productCategory } from "../utilities/productCategoryApi";

const FilterProduct = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    //fetch all categories
    const categories = await productCategory();
    setCategory(categories);
  }

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <div className="brand">
            <b style={{ fontSize: 12 }}>BRAND</b>
            <ExpandMoreIcon style={{ fontSize: 12 }} />
          </div>
          <div>
            {category.map((item: any) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <input type="checkbox" />
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
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 2 }}>
                Under 500
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                1000 To 3000
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
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={5} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={4} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={3} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input type="checkbox" />
              <label className="checkboxes" style={{ marginTop: 4 }}>
                <Rating initialValue={2} size={13} readonly={true} />
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <input type="checkbox" />
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
