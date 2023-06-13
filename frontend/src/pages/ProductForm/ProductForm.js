import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Container } from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as api from "../../api/index.js";
//import { CloudinaryContext, Image } from "cloudinary-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import useStyles from "./styles";
import { companyBrandCapacity, categories, china, countries, india, oman, southkorea, thailand, veitnam } from "./data.js";
import { createProduct } from "../../actions/products.js";
import { useDispatch } from "react-redux";
//import { INITIAL_STATE, producReducer } from "./productReducer";

const ProductForm = ({ currentId, setCurrentId }) => {
  //const regex = /^[0-9\b]+$/;
  const regex = /^-?\d*\.?\d*$/;
  //const [state, dispatch] = useReducer(producReducer, INITIAL_STATE);
  const [isUploading, setIsUploading] = useState(false);
  const [productData, setProductData] = useState({
    category: "",
    country: "",
    company: "",
    code: "",
    brand: "",
    price: "",
    capacity: "",
    image: "",
    description: "",
    netWeight: "",
    grossWeight: "",
    palatSize: "",
    LocalPrice: "9",
    freezonePrice: "10",
  });
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  let choosenCountry = productData.country.toLowerCase();
  let companies = ["None", "Choose Company"];
  switch (choosenCountry) {
    case "china":
      companies = china;
      break;
    case "india":
      companies = india;
      break;
    case "south korea":
      companies = southkorea;
      break;
    case "oman":
      companies = oman;
      break;
    case "veitnam":
      companies = veitnam;
      break;
    case "thailand":
      companies = thailand;
      break;
    default:
      companies = ["None"];
  }
  let choosenCompany = productData.company.toLowerCase();
  let brands = ["None", "Choose Brand"];
  if (choosenCompany) {
    brands = companyBrandCapacity
      .filter((item) => item.companyName.toLowerCase() === choosenCompany.toLocaleLowerCase())[0]
      ?.brands?.map((i) => i.brandName);
  }
  let choosenBrand = productData.brand.toLowerCase();
  let capacities = ["None", "Choose Brand"];
  if (choosenBrand) {
    let brandsForCap = companyBrandCapacity.filter((item) => item.companyName.toLowerCase() === choosenCompany.toLocaleLowerCase())[0]
      .brands;
    capacities = brandsForCap.filter((item) => item.brandName.toLocaleLowerCase() === choosenBrand.toLowerCase())[0]?.capacities;
  }

  const classes = useStyles();

  const clear = () => {
    setProductData({
      category: "",
      country: "",
      company: "",
      code: "",
      brand: "",
      price: 0,
      capacity: "",
      image: "",
      description: "",
      netWeight: 0,
      grossWeight: 0,
      palatSize: 0,
      bl: [],
    });
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jix4eghn");

    const response = await axios.post("https://api.cloudinary.com/v1_1/dvfuxrg12/image/upload", data);
    console.log(response.data.secure_url);
    setIsUploading(false);
    const image_url = response.data.secure_url;

    setProductData({ ...productData, image: image_url });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
    try {
      dispatch(createProduct(productData));
      showToastMessage();
      clear();
    } catch (e) {
      showErrorMessage();
      console.log(e);
    }
  };

  const showToastMessage = () => {
    toast.success("Product added Succesfully ✅", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const showErrorMessage = () => {
    toast.error("Please complete all mandatory fields or enter a valid image", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  /*
  const handeleDatasheetSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData()
    formData.append('profileImg', image)
    axios.post("http://localhost:5000/products", formData, { }).then(res => {
        console.log(res)
    })
  }
*/
  return (
    <div className="card-add-product">
        <div className="card-add-product-tittle">
            <h3 > Add Product</h3>
        </div>
      <div className="card-add-product-body">
      <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="categotry">Category</label>
            <select class="form-select " required  value={productData.category}   onChange={(e) => setProductData({ ...productData, category: e.target.value })} aria-label="Default select example">
              <option selected disabled value="">choose category</option>
              {categories?.map((cat, i) => {
                return (
                   <option  value={cat} key={i}> {cat}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="categotry">Country</label>
            <select class="form-select" required value={productData.country} onChange={(e) => setProductData({ ...productData, country: e.target.value })} aria-label="Default select example">
              <option selected disabled value="">choose country</option>
              {countries?.map((count, i) => {
                return (
                 <option  value={count} key={i}> {count}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="categotry">Company</label>
            <select class="form-select" required value={productData.company} onChange={(e) => setProductData({ ...productData, company: e.target.value })} aria-label="Default select example">
              <option selected disabled value=""> choose comapny</option>
              {choosenCountry}
              {companies?.map((comp, i) => {
                return (
                 <option value={comp} key={i}>{comp}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="categotry">Brand</label>
            <select class="form-select"   value={productData.brand}  onChange={(e) => setProductData({ ...productData, brand: e.target.value })} aria-label="Default select example">
              <option selected disabled value="">choose brand</option>
              {brands?.map((brand, i) => {
                return (
                   <option value={brand} key={i}> {brand}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="categotry">Capacity</label>
            <select class="form-select" required value={productData.capacity} onChange={(e) => setProductData({ ...productData, capacity: e.target.value })} aria-label="Default select example">
              <option selected disabled value="">choose capacity</option>
              {capacities?.map((cap, i) => {
                return (
                  <option value={cap} key={i}> {cap}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="productCode">Product Code</label>
            <input class="form-control " id="productCode" type="text"  onChange={(e) => setProductData({ ...productData, code: e.target.value })} placeholder="Enter product code"   autocomplete="on"/>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="netWight">Net Weight</label>
            <input class="form-control " id="netWight"
            value={productData.netWeight}
            onChange={(e) => {
              if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
                setProductData({ ...productData, netWeight: e.target.value });
            }} type="text" placeholder="Enter net wieght"  autocomplete="on"  />
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="groosWeihgt">Gross Weight</label>
            <input class="form-control " id="grossWeihgt"
             value={productData.grossWeight}
             onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value))
                setProductData({ ...productData, grossWeight: e.target.value });
            }} type="text" placeholder="Enter groos weight"   autocomplete="on"/>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="paletSize">Palet Size</label>
            <input class="form-control "
            value={productData.palatSize}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value))
                setProductData({ ...productData, palatSize: e.target.value });
            }} id="paletSize" type="text" placeholder="Enter palet size"   autocomplete="on"/>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="netPrice">Net Price</label>
            <input class="form-control "
            value={productData.price}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value))
                setProductData({ ...productData, price: e.target.value });
            }} id="netPrice" type="text" placeholder="Enter net price"  autocomplete="on" />
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="freezonePrice">Freezone Price</label>
            <input class="form-control "
            value={productData.freezonePrice}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value))
                setProductData({ ...productData, freezonePrice: e.target.value });
            }}
             id="freezonePrice" type="text" placeholder="enter freezone price"   autocomplete="on"/>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="form-group">
            <label htmlFor="localPrice">Local Price</label>
            <input class="form-control " 
            value={productData.LocalPrice}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value))
                setProductData({ ...productData, LocalPrice: e.target.value });
            }}
            id="localPrice" type="text" placeholder="enter local price"   autocomplete="on"/>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea class="form-control "
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            id="description" type="text" rows="4" placeholder="Enter description"  ></textarea>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="mt-2 mb-3">
          <div class="input-group">
            <input type="file"
             accept="image/x-png, image/gif, image/jpeg"
             onChange={(e) => {
               if (e.target.files[0].size > 15e4) {
                 window.alert("Please upload a file smaller than 150 Kb");
               } else {
                 setImage(e.target.files[0]);
                 setIsUploading(true);
               }
             }}
            class="form-control" id="inputGroupFile02" />
            <label class="input-group-text" onClick={handleUpload}>Upload</label>
          </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="form-group text-center">
          <div  className="ags-btns-group">
              <button onClick={clear} className="ags-btn-main">Clear</button>
              <button type="submit"  disabled={isUploading} className="ags-btn-main-fill">Submit</button>
           </div>
          </div>
        </div>
      </div>
      </form>
        {/* <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={productData.category}
              label="Category"
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories?.map((cat, i) => {
                return (
                  <MenuItem value={cat} key={i}>
                    {cat}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={productData.country}
              label="Country"
              onChange={(e) => setProductData({ ...productData, country: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries?.map((count, i) => {
                return (
                  <MenuItem value={count} key={i}>
                    {count}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={productData.company}
              label="Company"
              onChange={(e) => setProductData({ ...productData, company: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {choosenCountry}
              {companies?.map((comp, i) => {
                return (
                  <MenuItem value={comp} key={i}>
                    {comp}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={productData.brand}
              label="Brand"
              onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brands?.map((brand, i) => {
                return (
                  <MenuItem value={brand} key={i}>
                    {brand}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Capacity</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={productData.capacity}
              label="Capacity"
              onChange={(e) => setProductData({ ...productData, capacity: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {capacities?.map((cap, i) => {
                return (
                  <MenuItem value={cap} key={i}>
                    {cap}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            name="code"
            variant="outlined"
            label="Product Code"
            fullWidth
            value={productData.code}
            onChange={(e) => setProductData({ ...productData, code: e.target.value })}
          />
          <TextField
            name="netWeight"
            variant="outlined"
            label="Net Weight"
            fullWidth
            value={productData.netWeight}
            onChange={(e) => {
              if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setProductData({ ...productData, netWeight: e.target.value });
            }}
          />
          <TextField
            name="grossWeight"
            variant="outlined"
            label="Gross Weight"
            fullWidth
            value={productData.grossWeight}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, grossWeight: e.target.value });
            }}
          />
          <TextField
            name="paletSize"
            variant="outlined"
            label="Palet Size"
            fullWidth
            value={productData.palatSize}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, palatSize: e.target.value });
            }}
          />
          <TextField
            name="price"
            variant="outlined"
            label="Net Price"
            fullWidth
            value={productData.price}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, price: e.target.value });
            }}
          />
          <TextField
            name="freezonePrice"
            variant="outlined"
            label="Freezone Price"
            fullWidth
            value={productData.freezonePrice}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, freezonePrice: e.target.value });
            }}
          />
          <TextField
            name="LocalPrice"
            variant="outlined"
            label="Local Price"
            fullWidth
            value={productData.LocalPrice}
            onChange={(e) => {
              if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, LocalPrice: e.target.value });
            }}
          />
          <TextField
            name="description"
            variant="outlined"
            label="DESECRIPTION"
            fullWidth
            multiline
            minRows={4}
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />
          <div className={classes.fileInput}>
            <input
              style={{ color: "red", width: "25%", height: "30px" }}
              type="file"
              name="img"
              accept="image/x-png, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files[0].size > 15e4) {
                  window.alert("Please upload a file smaller than 150 Kb");
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
                width: "12%",
                backgroundColor: "red",
                height: "30px",
                marginLeft: "20px",
                borderRadius: "5%",
              }}
              onClick={handleUpload}
            >
              Upload image
            </button>
          </div>
           <div  className="ags-btns-group">
              <button onClick={clear} className="ags-btn-main">Clear</button>
              <button type="submit"  disabled={isUploading} className="ags-btn-main-fill">Submit</button>
           </div>
        </form> */}
      <ToastContainer />
      </div>
    </div>
  );
};

export default ProductForm;
