import React, { useRef, useState } from "react";
import useStyles from "./styles";
import "./style/product.css";
import { useSelector, useDispatch } from "react-redux";
import { addProductToWarrantyList, removeProductFromWarrantyList, setProductQty } from "../../../../store/warrantySlice";

import { addProducttocart, deletProductformCart } from "../../../../store/cartSlice";
import product from "../Product/style/product.css";
import Price from "./Price";
import axios from "axios";
import { BASE_URL, downloadDatasheet } from "../../../../actions/products";
const Product = ({ product, index }) => {
  const onButtonClick = async (id, downloadedFileName) => {
    downloadDatasheet(id, downloadedFileName);
  };
  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  // const QtyRef = useRef('')

  const [qty, setQty] = useState("");

  const classes = useStyles();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) {
      dispatch(addProductToWarrantyList({ ...product, qty }));
    } else {
      dispatch(removeProductFromWarrantyList(product));
    }
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  let stock = 0;
  product.bl.map((item) => {
    stock = stock + item.qty;
  });

  const addTocart = (items, index) => {
    dispatch(addProducttocart(items));

    // document.querySelector(".sidebar").style.display = "block";
  };

  const removefromcart = (items, index) => {
    dispatch(deletProductformCart(items, index));
  };

  const itemfromCart = useSelector((state) => state.cart.cart);
  // const data = itemfromCart.map((item) =>
  //   item._id.includes(product._id) ? true : false
  // );

  const exist = itemfromCart.some((item) => item._id === product._id);

  const inStock = product.stock > 0;

  return (
    <div className={exist ? "item_card active-card" : "item_card"}>
      <div className="product__item" style={{}}>
        <div className="product__image ">
          {exist ? (
            <img
              onClick={() => {
                removefromcart(product, index);
              }}
              src={
                product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                  ? product.image
                  : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
              }
              alt=""
            />
          ) : (
            <img
              onClick={() => {
                addTocart({
                  ...product,
                  LocalPriceAED: product.LocalPrice * usdToAedRate,
                  freezonePriceAED: product.freezonePrice * usdToAedRate,
                });
              }}
              src={
                product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                  ? product.image
                  : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
              }
              alt=""
            />
          )}
          {exist ? (
            <div
              className="check__product"
              onClick={() => {
                removefromcart(product, index);
              }}
            >
              <span className="check__product__icon_checked">&#10004;</span>
            </div>
          ) : (
            <div
              className="check__product"
              onClick={() => {
                addTocart({
                  ...product,
                  LocalPriceAED: product.LocalPrice * usdToAedRate,
                  freezonePriceAED: product.freezonePrice * usdToAedRate,
                });
              }}
            >
              <span className="check__product__icon_unchecked">&#10004;</span>
            </div>
          )}
        </div>
        <div className="product__description">
          {/* <div className="item__prices">
            <div>
              <label htmlFor="">Capacity : {product.capacity} </label>
            </div>
          </div>
          <div className="item__prices">
            {showPrice && (
              <div>
                {currency === "AED" ? (
                  <>
                    {location === "freezone"
                      ? (product.freezonePrice * usdToAedRate)?.toFixed(2)
                      : (product.LocalPrice * usdToAedRate)?.toFixed(2)}
                    &nbsp;{currency}
                  </>
                ) : (
                  <>
                    {location === "freezone" ? product.freezonePrice : product.LocalPrice}&nbsp;{currency}
                  </>
                )}

                {
            }
              </div>
            )}
            {showStock && (
              <div style={inStock ? { color: "green" } : { color: "red" }}>
                <label htmlFor="">Stock : {product.stock} </label>
              </div>
            )}
          </div>
          <div className="product__description_code_brand">
            {product.brand} {product.code}
          </div> */}
          <div className="card-desc">
            <p className="capacity">
              {product.brand} {product.code}{" "}
            </p>
            <p className="capacity">
              <span>({product.capacity})</span>
            </p>
            <div class="grid-container">
              {/* <div class="grid-item">
                  <p>Capacity</p>
                  <h5>5 Ah</h5>
                </div> */}
              {/* <div class="grid-item"> */}
              <div class="grid-item">
                <p>Price</p>
                <h5>
                  <div>
                    {showPrice && (
                      <div>
                        {currency === "AED" ? (
                          <>
                            {location === "freezone"
                              ? (product.freezonePrice * usdToAedRate)?.toFixed(2)
                              : (product.LocalPrice * usdToAedRate)?.toFixed(2)}
                            &nbsp;AED
                          </>
                        ) : (
                          <>{location === "freezone" ? product.freezonePrice : product.LocalPrice}&nbsp;$</>
                        )}

                        {}
                      </div>
                    )}
                  </div>
                </h5>
              </div>
              {/* </div> */}
              {/* <div class="grid-item"> */}
              <div class="grid-item">
                <p>Stock </p>
                <h5>
                  {showStock && (
                    <div style={inStock ? { color: "green" } : { color: "red" }}>
                      <div htmlFor=""> {product.stock} </div>
                    </div>
                  )}
                </h5>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* {showDatasheet && (
            <div className="product__button">
              <button
                className="ags-btn-main-fill datasheet_but"
                onClick={() => onButtonClick(product._id, product.code)}
              >
                <span> Download Datasheet <i class="uil uil-arrow-to-bottom"></i></span>
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
