import React from "react";
import "./Products.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Product from "./Product/Product";

const Products = ({ searchQuery }) => {
  let products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.show.isLoading);

  /* ------------------------------- searchQuery ------------------------------ */
  if (searchQuery?.length > 1) {
    products = products.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  /* -------------------------------------------------------------------------- */

  return isLoading ? (
    <div style={{ margin: "auto" }} className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="products_container">
      <div className="grid">
        {products?.map((product, index) => (
          <Product product={product} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
