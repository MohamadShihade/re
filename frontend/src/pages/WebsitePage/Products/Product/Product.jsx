import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToPo, deleteProductFromPo } from "../../../../store/poSlice";
import { downloadDatasheet } from "../../../../actions/products";
import "./Product.css";

const Product = ({ product, index }) => {
  const onButtonClick = async (id, downloadedFileName) => {
    downloadDatasheet(id, downloadedFileName);
  };
  const poProucts = useSelector((state) => state.po.products);
  const exist = poProucts.some((item) => item._id === product._id);

  const dispatch = useDispatch();
  const removefromPo = (items, index) => {
    dispatch(deleteProductFromPo(items, index));
  };
  const addToPo = (items, index) => {
    dispatch(addProductToPo(items));

    // document.querySelector(".sidebar").style.display = "block";
  };
  return (
    <>
      <div className={false ? "item_card active-card" : "item_card"}>
        <div className="product__item" style={{ backgroundColor: "rgb(245 251 255)" }}>
          <div className="product__image ">
            {
              <img
                src={
                  product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                    ? product.image
                    : process.env.PUBLIC_URL + `images/${product._id}_1.png` ||
                      `/user/images/${product._id}_1.png` ||
                      `images/${product._id}_1.JPG`
                }
                alt=""
              />
            }
          </div>
          <div className="product__description" style={{ paddingTop: "10px" }}>
            <div className="product__description_code_brand" style={{ fontWeight: "bold", color: "#188cef", fontSize: "18px" }}>
              {product.brand}
            </div>
            <div className="product__description_code_brand" style={{ fontSize: "18px", fontFamily: "monospace", color: "123c89" }}>
              {product.code}
            </div>
            <div className="item__prices">
              <div style={{ margin: "auto" }}>
                <label style={{ padding: "0 0 12px 0", fontSize: "14px", fontWeight: "lighter" }} htmlFor="">
                  Capacity : {product.capacity}{" "}
                </label>
              </div>
            </div>
          </div>
          {/* <div className="product__button">
          <button
            className="datasheet_but"
            style={
              true ? { backgroundColor: `#1bf581`, color: "black" } : { backgroundColor: `#fa5252`, color: "black" }
            }
            onClick={() => onButtonClick(product._id, product.code)}
          >
            <span> Download Datasheet <i class="uil uil-arrow-to-bottom"></i></span>
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Product;
