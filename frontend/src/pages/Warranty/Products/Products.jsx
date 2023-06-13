import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Container, Typography } from "@material-ui/core";
import "./products_styles.css";
import { AiFillCloseCircle, AiTwotoneDelete } from "react-icons/ai";
import Product from "./Product/Product";
import useStyles from "./styles";
import { staticProducts } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { addProducttocart, deletProductformCart, deleteAll } from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaCarBattery } from "react-icons/fa";
import FilteredPagination from "../FilteredPagination";
import ReactPaginate from "react-paginate";
import { setOffset } from "../../../store/productsSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
const Products = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const isLoading = useSelector((state) => state.show.isLoading);
  const cart = useSelector((state) => state.cart.cart);

  const spliceCart = (item) => {
    dispatch(deletProductformCart(item));
  };

  const deleteALl = () => {
    dispatch(deleteAll());
  };

  // const navigate = () => {
  //   navigate("/table");
  // };

  const cartLength = useSelector((state) => state.cart.cart);

  const closeside = () => {
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".modal").style.display = "none";
  };

  const showList = () => {
    document.querySelector(".sidebar").style.display = "block";
    document.querySelector(".modal").style.display = "block";
  };

  const classes = useStyles();
  let productsCount = products.length;

  //Pagination//////////////////////////////

  const showFilters = useSelector((state) => state.show.showFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    const totalPages = Math.ceil(products.length / 12);
    setTotalPages(totalPages);
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const displayData = products.slice(startIndex, endIndex);
    setDisplayData(displayData);
  }, [currentPage, products]);

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  //End Pagination ////////////////

  function Items({ currentItems }) {
    return (
      <div className="grid">
        {currentItems?.map((product, index) => (
          <Product product={product} key={index} index={index} />
        ))}
      </div>
    );
  }

  let offsetVal = 0;
  const changOffsetVal = (newOffset) => {
    offsetVal = newOffset;
  };

  function PaginatedItems({ itemsPerPage, searchQuery }) {
    const [itemOffset, setItemOffset] = useState(useSelector((state) => state.products.itemOffset));
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    const handlePageClick = (event) => {
      console.log("Clicked");
      const newOffset = (event.selected * itemsPerPage) % products.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
      dispatch(setOffset(newOffset));
    };

    /* ------------------------------- searchQuery ------------------------------ */
    if (searchQuery?.length > 1) {
      currentItems = currentItems.filter(
        (item) =>
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    /* -------------------------------------------------------------------------- */

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  //New Pagination ////////////////

  // console.log(totalPages);

  return isLoading ? (
    <div>
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="app__container">
      {/* {showFilters && (
        <div className="search__">
          {products.length < 1 && !isLoading ? (
            "No products Found"
          ) : (
            <p>
              {" "}
              There are <b> {`${productsCount}`} </b> products found{" "}
            </p>
          )}
        </div>
      )} */}

      {products ? (
        showFilters ? (
          <PaginatedItems itemsPerPage={200} searchQuery={searchQuery} />
        ) : (
          products?.map((product, index) => <Product product={product} index={index} />)
        )
      ) : (
        <h1>Loading</h1>
      )}

      {cartLength.length > 0 ? (
        <div className="modal">
          <div className="sidebar">
            <div className="list__modal">
              <div className="list__">
                <span>List of Items : {cart.length} </span>
                <div className="close__" onClick={() => closeside()}>
                  <AiFillCloseCircle color="" size={40} />
                </div>
              </div>
              <ul className="list__ofItems">
                {cart.map((item, index) => (
                  <div className="card__item" key={index}>
                    <div>
                      {item.brand}&nbsp;{item.code}
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        spliceCart(item);
                      }}
                    >
                      <AiTwotoneDelete color="#E34A44" size={26} />
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className="sidebar__buttons">
              <div
                className="next"
                onClick={() => {
                  navigate("/user/checkCustomer");
                }}
              >
                <span>
                  {" "}
                  Next <i class="uil uil-angle-right-b"></i>{" "}
                </span>
              </div>
              <div className="delete" onClick={() => deleteALl()}>
                <span> Delete all </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
