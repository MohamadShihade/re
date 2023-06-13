import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WebsitePage.css";
import { set } from "lodash";

const SearchBox = ({ onChange, onCategoeyChange }) => {
  const [category, setCategory] = useState("all");
  const handleFilterClick = (filter) => {
    onCategoeyChange(filter);
    setCategory(filter);
  };
  return (
    <div className="header-website">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <input type="text" placeholder="Search.." name="search2" onChange={onChange} />
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="group-buttons">
          <span
              className={`ags-btn-main-fill ${category === "all" ? "chosen_cat" : ""}`}
              onClick={() => {
                handleFilterClick("all");
              }}
            >
              All
            </span>
            <span
              className={`ags-btn-main-fill ${category === "battery" ? "chosen_cat" : ""}`}
              onClick={() => {
                handleFilterClick("battery");
              }}
            >
              Battery
            </span>
            <span
              className={`ags-btn-main-fill ${category === "solar" ? "chosen_cat" : ""}`}
              onClick={() => {
                handleFilterClick("solar");
              }}
            >
              Solar
            </span>
            <span
              className={`ags-btn-main-fill ${category === "inverter" ? "chosen_cat" : ""}`}
              onClick={() => {
                handleFilterClick("inverter");
              }}
            >
              Inverter
            </span>
          </div>
        </div>
      </div>
    </div>
    // <div className="search_div_po">
    //   <input className="search_box_po" type="text" placeholder="Search.." name="search2" onChange={onChange} />
    //   <div className="filter_div">
    //     <div
    //       onClick={() => {
    //         handleFilterClick("battery");
    //       }}
    //       className={`filter_but ${category === "battery" ? "chosen_cat" : ""}`}
    //     >
    //       Battery
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("solar");
    //       }}
    //       className={`filter_but ${category === "solar" ? "chosen_cat" : ""}`}
    //     >
    //       Solar
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("inverter");
    //       }}
    //       className={`filter_but ${category === "inverter" ? "chosen_cat" : ""}`}
    //     >
    //       Inverter
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("all");
    //       }}
    //       className={`filter_but ${category === "all" ? "chosen_cat" : ""}`}
    //     >
    //       All
    //     </div>
    //   </div>
    // </div>
  );
};

export default SearchBox;
