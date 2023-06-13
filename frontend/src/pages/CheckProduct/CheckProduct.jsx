import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/index.js";

const CheckProduct = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [isExists, setIsExists] = useState("init");
  const checkProduct = async (event) => {
    try {
      // const formData = { username: username.current.value, password: psswd.current.value };
      // dispatch(login(formData, navigate));
      console.log(serialNumber);
      await axios.post(`${BASE_URL}/warranty`, { serialnumber: serialNumber }).then(async (response) => {
        console.log(response.data);
        setIsExists(response.data);
        setSerialNumber("");
      });
    } catch (error) {}
  };
  return (
    <>
      {console.log(serialNumber)}
      <div className="ags-header-deadline">
        <h1>AGS</h1>
        <div className="menus-items">
          <a href="https://agsdubai.com/">Home</a>
          <a href="http://143.42.61.215/website">Products</a>
          <a href="https://agsdubai.com/supplier">Suppliers</a>
          <a href="https://agsdubai.com/news">News</a>
          <a href="http://ags-sales.com/check">Check Inverter</a>
          <a href="https://agsdubai.com/contact.html">Contact Us</a>
        </div>
        <div className="menus-items-mobile">
          <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <a class="invoice">
              <i class="uil uil-bars"></i>
            </a>
          </button>
          <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
            <a href="https://agsdubai.com/" className="dropdown-item">
              {" "}
              Home{" "}
            </a>
            <a href="http://143.42.61.215/website" className="dropdown-item">
              {" "}
              Products{" "}
            </a>
            <a href="https://agsdubai.com/supplier" className="dropdown-item">
              {" "}
              Suppliers{" "}
            </a>
            <a href="https://agsdubai.com/news" className="dropdown-item">
              {" "}
              News{" "}
            </a>
            <a href="http://ags-sales.com/check" className="dropdown-item">
              {" "}
              Check Inverter{" "}
            </a>
            <a href="https://agsdubai.com/contact.html" className="dropdown-item">
              {" "}
              Contact Us{" "}
            </a>
          </div>
        </div>
      </div>
      {/* <div className="navbar-check">
        <h1>AGS</h1>
        <div className="menus-items">
          <span>Home</span>
          <span>Products</span>
          <span>Suppliers</span>
          <span>News</span>
          <span>Login</span>
          <span>Contact Us</span>
        </div>
        <button>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link active " href="home.html">
                <span class="sr-only">(current)</span> Home{" "}
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="http://143.42.61.215/website">
                Products
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="Supplier.html">
                Suppliers
              </a>
            </li>
            <li class="nav-item  ">
              <a class="nav-link" href="News.html">
                News
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="http://login.agsdubai.com/">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <div className="ags-header checker-header">
        <div className="ags-header-deadline">
          <h1>AGS</h1>
        </div>
      </div> */}
      <div className="checker-body">
        <div className="tittle">
          {/* <h4>Check Product</h4> */}
          <h4>تحقق من المنتج</h4>
        </div>
        <form>
          <div className="img-checker">
            <img src="./images/checker.jpeg" alt="checker-img" />
          </div>
          <div className="form-group">
            {/* <label htmlFor="check">Serial Number</label> */}
            <label htmlFor="check">الرقم التسلسلي</label>
            {/* <input type="text" className='form-control' ref={serialNumber} placeholder='Enter serial number'  /> */}
            <input
              type="text"
              className="form-control"
              value={serialNumber}
              onChange={(e) => {
                setSerialNumber(e.target.value);
                setIsExists("init");
              }}
              placeholder="إدخل الرقم التسلسلي "
            />
          </div>
          <div className="btn-checker">
            <button type="button" className="ags-btn-main-fill" disabled={serialNumber.length <= 2} onClick={checkProduct}>
              تحقق
            </button>
          </div>
        </form>
        <div className="result">
          {isExists === "exist" && (
            // <h1 className='success' ><i class="uil uil-check-circle"></i> This product is autheticated</h1>
            <h1 className="success">
              <i class="uil uil-check-circle"></i> هذا المنتج اصلي من شركة AGS international
            </h1>
          )}
          {isExists === "notexist" && (
            <h1 className="required">
              {" "}
              <i class="uil uil-times-circle"></i> هذا المنتج مقلد احذر استخدامه
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckProduct;
