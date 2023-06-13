import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'

const CheckProduct = () => {
  const serialNumber = useRef();
  const [isExists, setIsExists] = useState(true);
  const checkProduct = (event) => {
    try {
      // const formData = { username: username.current.value, password: psswd.current.value };
      // dispatch(login(formData, navigate));
      console.log(serialNumber.current.value)
    } catch (error) {}
  };
  return (
    <>
       <div className="ags-header-deadline">
        <h1>AGS</h1>
        <div className='menus-items'>
            <a href="https://agsdubai.com/">Home</a>
            <a href="http://143.42.61.215/website">Products</a>
            <a href="https://agsdubai.com/supplier">Suppliers</a>
            <a href="https://agsdubai.com/news">News</a>
            <a href="https://agsdubai.com/contact.html">Contact Us</a>
        </div>
        <div className='menus-items-mobile'>
          <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <a class="invoice">
            <i class="uil uil-bars"></i>
            </a>
          </button>
          <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
            <a href="https://agsdubai.com/" className='dropdown-item'>  Home </a>
            <a href="http://143.42.61.215/website" className='dropdown-item'>  Products </a>
            <a href="https://agsdubai.com/supplier" className='dropdown-item'>  Suppliers </a>
            <a href="https://agsdubai.com/news" className='dropdown-item'>  News </a>
            <a href="https://agsdubai.com/contact.html" className='dropdown-item'>  Contact Us </a>
          </div>
        </div>
      </div>
    {/* <div className="ags-header checker-header">
      <div className="ags-header-deadline">
        <h1>AGS</h1>
        <div className='menus-items'>
            <span>Home</span>
            <span>Products</span>
            <span>Suppliers</span>
            <span>News</span>
            <sp>Contact Us</sp>
        </div>
      </div>
    </div> */}
    <div className="checker-body">
      <div className='tittle'>
        {/* <h4>Check Product</h4> */}
        <h4>تحقق من المنتج</h4>
      </div>
      <form >
        <div className='img-checker'>
          <img src="./images/checker.jpg" alt="checker-img" />
        </div>
        <div className="form-group">
          {/* <label htmlFor="check">Serial Number</label> */}
          <label htmlFor="check">الرقم التسلسلي</label>
          {/* <input type="text" className='form-control' ref={serialNumber} placeholder='Enter serial number'  /> */}
          <input type="text" className='form-control' ref={serialNumber} placeholder='إدخل الرقم التسلسلي '  />
        </div>
        <div className='btn-checker'>
         <button className='ags-btn-main-fill' onClick={checkProduct}>تحقق</button>
        </div>
      </form>
      <div className="result">
      {isExists &&  
        // <h1 className='success' ><i class="uil uil-check-circle"></i> This product is autheticated</h1>
        <h1 className='success' ><i class="uil uil-check-circle"></i> هذا المنتج اصلي من شركة AGS international</h1>
      }
      {!isExists &&  
        <h1 className='required'> <i class="uil uil-times-circle"></i>  هذا المنتج مقلد 
        احذر استخدامه</h1>
      }
      </div>
    </div>
   </>
  )
}

export default CheckProduct