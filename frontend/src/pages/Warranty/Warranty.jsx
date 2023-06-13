import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grow, Paper } from "@material-ui/core";
import { Button } from "@mui/material";
import Pagination from "./Pagination";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import "react-dropdown-tree-select/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { china, india, south_korea, oman, veitnam, thailand } from "./data";
import useStyles from "./styles";
import Products from "./Products/Products";
import { setFiltersState } from "../../store/filtersSlice";

import "./style/warranty.css";
import Category from "./Category";
import CountryItem from "./Country";
import { categories } from "../../data";
import { getFilteredProducts } from "../../actions/products";
import { useEffect } from "react";
import SideFilters from "./SideFilters/SideFilters";
import DropDown from "./DropDown";
import { setShowFilters } from "../../store/showingSlice";
import Brands from "./Brands/Brands";
import { setIsPI } from "../../store/piSlice";
import SearchBox from "../../Components/SearchBox/SearchBox";

let choosenCompanies = [];
let choosenBrands = [];
let choosenCapacities = [];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Warranty = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const countriesProducts = useSelector((state) => state.products.productsForCountries);
  let countries = [];
  countriesProducts.map((product) => {
    if (!countries.includes(product.country)) {
      countries.push(product.country);
    }
  });
  console.log(countries);

  const handleSearch = () => {
    let companies = [...new Set(choosenCompanies)];
    let brands = [...new Set(choosenBrands)];
    var capacities = choosenCapacities.reduce((unique, o) => {
      if (!unique.some((obj) => obj.father === o.father && obj.cap === o.cap)) {
        unique.push(o);
      }
      return unique;
    }, []);
    dispatch(
      setFiltersState({
        ...filters,
        companies: companies,
        brands: brands,
        capacities: capacities,
      })
    );
    choosenCompanies = [];
    choosenBrands = [];
  };

  //Osama///////////
  const query = useQuery();
  const page = query.get("page") || 1;
  ///////////////////////////
  const dispatch = useDispatch();
  const classes = useStyles();
  const shows = useSelector((state) => state.show.showPrice);
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filters.filters);

  ///////////////////////////////////////////////////////////////////////
  let arrayOfSelectedNodes = [];

  let choosenCompanies = [];
  const [chosenCompanies, setChosenCompanies] = useState([]);

  let allCompanies = [];

  let choosenBrands = [];
  let choosenCapacities = [];

  function onAction(node, action) {
    console.log("onAction::", action, node);
  }
  const onChange = (currentNode, selectedNodes) => {
    console.log("im the best in the world");
    //choosenCompanies = [];
    // choosenBrands = [];
    // choosenCapacities = [];

    Object.keys(selectedNodes).forEach((k) => {
      const node = selectedNodes[k];
      if (node._depth === 0) {
        choosenCompanies.push(node.label);
      }
      if (node._depth === 1) {
        choosenBrands.push(node.label);
      }
      if (node._depth === 2) {
        let father = findFateher(node);
        // let grandFather = findFateher(father);
        // console.log("FATHER :" + father + "GRAND Father " + grandFather);
        const cap = node.label;
        choosenCapacities.push({ cap, father });
      }
    });

    //console.log(choosenCapacities);

    arrayOfSelectedNodes = selectedNodes.map((node) => {
      let str = JSON.stringify(node);
      return str;
    });
    handleSearch();
  };

  let toggled = [];

  const onNodeToggle = (currentNode) => {
    toggled.push(currentNode);
  };

  const findFateher = (child) => {
    let found = "";
    Object.keys(toggled).forEach((k) => {
      const node = toggled[k];
      if (child._parent === node._id) {
        found = node.label;
      }
    });
    return found;
  };

  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };

  assignObjectPaths(china);
  assignObjectPaths(india);
  assignObjectPaths(south_korea);
  assignObjectPaths(oman);
  assignObjectPaths(veitnam);
  assignObjectPaths(thailand);

  const handleNext = () => {
    navigate("/warranty-check");
  };

  const navigateToChekCustomer = () => {
    navigate("/checkCustomer");
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  // const [showFilters, setShowFilters] = useState(true);
  const showFilters = useSelector((state) => state.show.showFilters);
  useEffect(() => {
    if (showFilters) {
      dispatch(getFilteredProducts(filters));
    }
  }, [dispatch, filters, showFilters]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCountryChange = (item) => {
    const isALL = selectedItems.includes("All");
    const index = selectedItems.indexOf(item);
    if (item === "All") {
      dispatch(setFiltersState({ ...filters, countries: ["All"], brands: [""] }));
      setSelectedItems(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedItems;
      if (isALL) selectedItems2.splice(selectedItems.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({
            ...filters,
            countries: [...selectedItems2, item],
            brands: [""],
          })
        );
        setSelectedItems([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            countries: selectedItems2.filter((_, i) => i !== index),
            brands: [""],
          })
        );
        setSelectedItems(selectedItems2.filter((_, i) => i !== index));
      }
    }
  };

  const handleCategoryChange = (item) => {
    const isALL = selectedCategories.includes("All");
    const index = selectedCategories.indexOf(item);
    if (item === "All") {
      dispatch(setFiltersState({ ...filters, categories: ["All"], brands: [""] }));
      setSelectedCategories(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedCategories;
      if (isALL) selectedItems2.splice(selectedCategories.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({
            ...filters,
            categories: [...selectedItems2, item],
            brands: [""],
          })
        );
        setSelectedCategories([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            categories: selectedItems2.filter((_, i) => i !== index),
            brands: [""],
          })
        );
        setSelectedCategories(selectedItems2.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Grow in sx={{ width: "100%" }}>
        <Container maxWidth="xl">
          {showFilters && (
            <>
              <div className="search__list">
                <div className="change__">
                  {selectedCategories.length !== 0 && (
                    <div className="filter__search">
                      {countries.map((item, i) => (
                        <>
                          <CountryItem key={i} title={item} img={item.img} onClick={handleCountryChange} />
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {!showFilters && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}
          <div className="section-next-btn">
            <button
              className="ags-btn-main-fill"
              onClick={() => {
                dispatch(setIsPI(false));
                navigate("/user/pricelistinfo");
              }}
            >
              <span>
                Next <i class="uil uil-angle-right-b"></i>
              </span>
            </button>
          </div>
          <div className="next_div" style={{ justifyContent: "space-between" }}>
            {/* this is search section  */}
            <div className="row">
              <div className="col-lg-6 col-md12">
                <SearchBox onChange={handleSearchBoxChange} />
              </div>
              <div className="col-lg-6 col-md12">
                <SideFilters />
              </div>
            </div>
          </div>
          <Products filters={filters} searchQuery={searchQuery} />
        </Container>
      </Grow>
    </div>
  );
};

export default Warranty;
