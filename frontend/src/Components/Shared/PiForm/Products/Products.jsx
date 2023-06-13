import React, { useEffect, useState } from "react";
import "./products_styles.css";
import Product from "./Product/Product";
import axios from "axios";
import { BASE_URL } from "../../../../api/index.js";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import SearchBox from "../../../SearchBox/SearchBox";

const Products = ({ handleAddToPi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error:", error);
      }
    };

    getProducts();
  }, []);

  let filteredProducts = [...products];
  filteredProducts = filteredProducts.filter(
    (item) =>
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isLoading ? (
    <div>
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="app__container">
      <SearchBox onChange={handleSearchBoxChange} />
      <div className="grid">
        {products ? (
          filteredProducts.map((product, index) => <Product product={product} key={index} handleAddToPi={handleAddToPi} />)
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
