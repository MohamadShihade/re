import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Products from "./Products/Products";
import "./WebsitePage.css";
import { useState } from "react";
import SearchBox from "./SearchBox";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
const WebsitePage = () => {
  let location = useLocation();
  React.useEffect(() => {
    console.log(location);
  }, [location]);
  const showNav = location.pathname === "/website";

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.show.isLoading);
  const poProucts = useSelector((state) => state.po.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };
  return isLoading ? (
    <div className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <>
      {showNav && (
        // <Navbar />
        <div className="ags-header-deadline">
          <h1>AGS</h1>
          <div className="menus-items">
            <a href="https://agsdubai.com/">Home</a>
            <a href="http://143.42.61.215/website">Products</a>
            <a href="https://agsdubai.com/supplier">Suppliers</a>
            <a href="https://agsdubai.com/news">News</a>
            <a href="http://ags-sales.com/check">Check Inverter</a>
            <a href="https://agsdubai.com/contact.html">Contact Us</a>
          </div>

          <div className="menus-items-mobile">
            <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <a class="invoice">
                <i class="uil uil-bars"></i>
              </a>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
              <a href="https://agsdubai.com/" className="dropdown-item">
                {" "}
                Home{" "}
              </a>
              <a href="http://143.42.61.215/website" className="dropdown-item">
                {" "}
                Products{" "}
              </a>
              <a href="https://agsdubai.com/supplier" className="dropdown-item">
                {" "}
                Suppliers{" "}
              </a>
              <a href="https://agsdubai.com/news" className="dropdown-item">
                {" "}
                News{" "}
              </a>{" "}
              <a href="http://ags-sales.com/check" className="dropdown-item">
                {" "}
                Check Inverter{" "}
              </a>
              <a href="https://agsdubai.com/contact.html" className="dropdown-item">
                {" "}
                Contact Us{" "}
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="po_page_container">
        {/* <div className="po_filters"> */}
        <SearchBox onChange={handleSearchBoxChange} onCategoeyChange={handleCategoryChange} />
        {/* </div> */}
        <Products searchQuery={searchQuery} category={category} />
      </div>
    </>
  );
};

export default WebsitePage;
