import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Products from "./Products/Products";
import "./MakePo.css";
import { useState } from "react";
import SearchBox from "./SearchBox";
import arrowRight from "./right-arrow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const MakePo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.show.isLoading);
  const poProucts = useSelector((state) => state.po.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return isLoading ? (
    <div className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="po_page_container">
      <div
        onClick={() => {
          navigate("/user/poinfo");
        }}
        className="next_button_fixed"
      >
        <FontAwesomeIcon icon={faChevronRight} fade style={{ color: "#ffffff", width: "45px", height: "45px" }} />{" "}
      </div>
      <div className="po_filters">
        <SearchBox onChange={handleSearchBoxChange} />
        <div className="no_of_items">
          items :<b style={{ color: "red" }}> {poProucts?.length} </b>
        </div>
        {console.log(poProucts)}
      </div>

      <Products searchQuery={searchQuery} />
    </div>
  );
};

export default MakePo;
