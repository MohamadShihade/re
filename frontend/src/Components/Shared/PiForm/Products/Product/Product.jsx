import React, { useRef, useState } from "react";
import useStyles from "./styles";
import "./style/product.css";
import { useSelector, useDispatch } from "react-redux";

const Product = ({ product, handleAddToPi }) => {
  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const [qty, setQty] = useState("");

  const classes = useStyles();

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  let stock = 0;
  product.bl.map((item) => {
    stock = stock + item.qty;
  });

  const itemfromCart = useSelector((state) => state.cart.cart);
  const exist = itemfromCart.some((item) => item._id === product._id);

  const inStock = product.stock > 0;

  return (
    <div className={exist ? "item_card active-card" : "item_card"}>
      <div class="close" data-dismiss="modal" aria-label="Close" className="product__item" style={{}} onClick={() =>{ handleAddToPi(product)}}>
        <div className="product__image ">
          {exist ? (
            <img
              onClick={() => {}}
              src={
                product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                  ? product.image
                  : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
              }
              alt=""
            />
          ) : (
            <img
              onClick={() => {}}
              src={
                product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                  ? product.image
                  : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
              }
              alt=""
            />
          )}
        </div>
        <div className="product__description">
          <div className="card-desc">
            <p className="capacity">
              {product.brand} {product.code}{" "}
            </p>
            <p className="capacity">
              <span>({product.capacity})</span>
            </p>
            <div class="grid-container">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
