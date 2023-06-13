import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToPo, deleteProductFromPo } from "../../../../store/poSlice";

const Product = ({ product, index }) => {
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
      <div className={exist ? "item_card active-card" : "product__item"}>
        <div className="product__item" style={{}}>
          <div className="product__image ">
            {exist ? (
              <img
                onClick={() => {
                  removefromPo(product, index);
                }}
                src={
                  product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                    ? product.image
                    : process.env.PUBLIC_URL + `images/${product._id}_1.png` ||
                      `images/${product._id}_1.jpg` ||
                      `images/${product._id}_1.JPG`
                }
                alt=""
              />
            ) : (
              <img
                onClick={() => {
                  addToPo(product);
                }}
                src={
                  product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                    ? product.image
                    : process.env.PUBLIC_URL + `images/${product._id}_1.png` ||
                      `images/${product._id}_1.jpg` ||
                      `images/${product._id}_1.JPG`
                }
                alt=""
              />
            )}
            {exist ? (
              <div
                className="check__product"
                onClick={() => {
                  removefromPo(product, index);
                }}
              >
                {/* <span className="check__product__icon_checked">&#10004;</span> */}
                <i class="uil uil-check"></i>
              </div>
            ) : (
              <div
                className="check__product"
                onClick={() => {
                  addToPo(product);
                }}
              >
                <span className="check__product__icon_unchecked">&#10004;</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
