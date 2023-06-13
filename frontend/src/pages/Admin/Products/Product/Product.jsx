import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct, updateProduct, uploadDatasheet } from "../../../../actions/products";
import "./style/product.css";

import { addProductToWarrantyList, removeProductFromWarrantyList, setProductQty } from "../../../../store/warrantySlice";

import { addProducttocart, deletProductformCart } from "../../../../store/cartSlice";
import product from "../Product/style/product.css";
import Price from "./Price";
import { Button, TextField } from "@material-ui/core";
import { BASE_URL } from "../../../../api/index";
import { deleteProductState } from "../../../../store/productsSlice";
const Product = ({ product, index }) => {
  const currency = useSelector((state) => state.filters.currency);

  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const location = useSelector((state) => state.filters.location);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  // const QtyRef = useRef('')

  const [qty, setQty] = useState("");
  const [stateProduct, setStateProduct] = useState(product);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [freezoneToLocalPercentage, setFreezoneToLocalPercentage] = useState(product.freezonePrice);
  const [additionOnLocalPercentage, setAdditionOnLocalPercentage] = useState(product.LocalPrice);
  const [brand, setBrand] = useState(product.brand);
  const [code, setCode] = useState(product.code);
  const [country, setCountry] = useState(product.country);
  const [company, setCompany] = useState(product.company);
  const [category, setCategory] = useState(product.category);
  const [capacity, setCapacity] = useState(product.capacity);
  const [description, setDescription] = useState(product.description);
  const [grossWeight, setGrossWeigth] = useState(product.grossWeight);
  const [netWeight, setNetWeight] = useState(product.netWeight);
  const [paletSize, setPaletSize] = useState(product.palatSize);
  const [image, setImage] = useState(product.image);
  const [fileData, setFileData] = useState("");
  const getFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const uploadFile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData, `${product._id}.pdf`);
    uploadDatasheet(data);
  };

  const [isUploading, setIsUploading] = useState(false);

  const classes = useStyles();

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jix4eghn");

    const response = await axios.post("https://api.cloudinary.com/v1_1/dvfuxrg12/image/upload", data);
    console.log(response.data.secure_url);
    setIsUploading(false);
    const image_url = response.data.secure_url;
    setImage(image_url);
  };

  const handlePriceStockChange = () => {
    dispatch(
      updateProduct(product._id, {
        ...product,
        price: price,
        stock: stock,
        brand: brand,
        code: code,
        country: country,
        category: category,
        company: company,
        capacity: capacity,
        description: description,
        netWeight: netWeight,
        image: image,
        grossWeight: grossWeight,
        paletSize: paletSize,
        freezonePrice: freezoneToLocalPercentage,
        LocalPrice: additionOnLocalPercentage,
      })
    );
    setStateProduct({
      ...stateProduct,
      price: price,
      stock: stock,
      brand: brand,
      code: code,
      country: country,
      category: category,
      company: company,
      capacity: capacity,
      description: description,
      netWeight: netWeight,
      image: image,
      grossWeight: grossWeight,
      paletSize: paletSize,
      freezoneToLocalPercentage: freezoneToLocalPercentage,
      additionOnLocalPercentage: additionOnLocalPercentage,
    });
    console.log(stateProduct);
    showToastMessage();
  };

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

  const showToastMessage = () => {
    toast.success("Product updated Succesfully ✅", {
      position: "top-center",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleConfirmDelete = () => {
    setShow(false);
    dispatch(deleteProductState(product._id));

    dispatch(deleteProduct(product._id));
  };
  const handleShow = () => setShow(true);

  return (
    <div className="item_card">
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>are you sure you want to delete</h4>{" "}
          <h4 style={{ color: "red" }}>
            {product.brand}
            {product.code}
          </h4>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={exist ? "product__item active-card" : "product__item"} style={{}}>
        <div className="product__image ">
          <img
            src={
              product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                ? product.image
                : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
            }
            alt=""
          />
          <div
            className="check__product"
            onClick={() => {
              handleShow();
            }}
          >
           <i class="uil uil-trash-alt "></i>
          </div>
        </div>
        <div className="product__description">
          <div className="item__prices">
            <div>
              <label htmlFor="">Capacity : {product.capacity} </label>
            </div>
          </div>
          <div className="item__prices">
            {showPrice && (
              <div>
                {location === "freezone" ? product.freezonePrice : product.LocalPrice}&nbsp;{"USD"}
                {/*}  <label htmlFor=''>Price : 
                <Price price={product.price} freezoneToLocalPercentage={product.freezonePrice}
              additionOnLocalPercentage={product.LocalPrice}/>
              </label>
            */}
              </div>
            )}
            {showStock && (
              <div>
                <label htmlFor="">Stock : {product.stock} </label>
              </div>
            )}
          </div>

          <div className="product__description">
            {product.brand}
            {product.code}
          </div>
          <div className="product_price_stock">
            <TextField
              style={{ marginBottom: "10px", width: "50%" }}
              variant="outlined"
              label="Net Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setStateProduct({
                  ...stateProduct,
                  price: e.target.value,
                  stock: stock,
                  freezoneToLocalPercentage: freezoneToLocalPercentage,
                  additionOnLocalPercentage: additionOnLocalPercentage,
                });
              }}
            ></TextField>
            <TextField
              error={freezoneToLocalPercentage <= 0}
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Freezone Price"
              value={freezoneToLocalPercentage}
              onChange={(e) => {
                setFreezoneToLocalPercentage(e.target.value);
              }}
            ></TextField>
            <TextField
              error={additionOnLocalPercentage <= 0}
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Local Price"
              value={additionOnLocalPercentage}
              onChange={(e) => {
                setAdditionOnLocalPercentage(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px " }}
              variant="outlined"
              label="Code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px " }}
              variant="outlined"
              label="Brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Capacity"
              value={capacity}
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px " }}
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Gross Weight"
              value={grossWeight}
              onChange={(e) => {
                setGrossWeigth(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Net Weight"
              value={netWeight}
              onChange={(e) => {
                setNetWeight(e.target.value);
              }}
            ></TextField>
            <TextField
              fullWidth
              style={{ marginBottom: "10px ", width: "50%" }}
              variant="outlined"
              label="Palet Size"
              value={paletSize}
              onChange={(e) => {
                setPaletSize(e.target.value);
              }}
            ></TextField>
            <input
              style={{ color: "red", width: "100%", height: "30px" }}
              type="file"
              name="img"
              accept="image/x-png, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files[0].size > 15e4) {
                  window.alert("Please upload a file smaller than 150 Kb");
                  return false;
                } else {
                  setImage(e.target.files[0]);
                  setIsUploading(true);
                }
              }}
            />
            <button
              type="button"
              style={{
                color: "white",
                width: "75%",
                backgroundColor: "#5e99ff",
                height: "30px",
                marginLeft: "20px",
                borderRadius: "5%",
              }}
              onClick={handleUpload}
            >
              Upload image
            </button>
            <form onSubmit={uploadFile}>
              <input style={{ color: "red", width: "100%", height: "30px" }} type="file" name="file" onChange={getFile} required />
              <input
                style={{
                  cursor: "pointer",
                  color: "white",
                  width: "75%",
                  backgroundColor: "#f28d8d",
                  marginLeft: "20px",
                  borderRadius: "5%",
                }}
                type="submit"
                name="upload"
                value="Upload Datasheet"
              />
            </form>

            <Button
              disabled={isUploading}
              variant="contained"
              style={{ marginTop: "10px", backgroundColor: "#5e99ff" }}
              onClick={handlePriceStockChange}
              fullWidth
            >
              Update Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
