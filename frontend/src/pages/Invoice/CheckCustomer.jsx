import React from "react";
import { useSelector } from "react-redux";
import './price_style.css'
import ProductItem from "../Warranty/Products/Product/ProductItem";
function calcPrice(price, freezoneToLocalPercentage, additionOnLocalPercentage,location,currency,usdToAedRate) {
    let netToFreezonePer = freezoneToLocalPercentage;
    let freezoneToLocalPer = additionOnLocalPercentage;
    let freezonePrice = price + (price * netToFreezonePer) / 100;
    let localPrice = freezonePrice + (freezonePrice * freezoneToLocalPer) / 100;

    if (location === "freezone") {
      if (currency === "USD") {
        return freezonePrice;
      } else {
        return ((freezonePrice * usdToAedRate * 100) / 100).toFixed(3);
      }
    } else {
      if (currency === "USD") {
        return localPrice.toFixed(2);
      } else {
        return ((localPrice * usdToAedRate * 100) / 100).toFixed(3);
      }
    }
  }
function CheckCustomer() {
  const cart = useSelector((state) => state.cart.cart);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

  return (
    <>
    
      <div className='list__ite'>
        {cart.map((item, index) => (
          <><div class="card">
      <div class="title__product">{item.brand}{item.code}</div>

      <div class="capacity">
        <span for=""> <label> Capicity :</label>{item.capacity}</span>
      </div>

      <div class="bar"></div>

      <div class="product__description">
        <div class="description__price">
          <div>
            <div class="price">
              <label for=""> Price: </label>&nbsp;&nbsp; {calcPrice(item.price,item.freezonePrice, item.LocalPrice,location,currency,usdToAedRate).toFixed(2)}&nbsp;{currency === "USD" ? "USD" : "AED"}
            </div>
           
          </div>
         
        </div>

      </div>
      <div class="description">
        {item.description}
      </div>
      <div class="image__">
        <img src={`images/${item._id}_1.png` || `images/${item._id}_1.jpg`|| `images/${item._id}_1.JPG` } alt="" srcset="" />
      </div>
    </div>
          
          </>
        ))}
      </div>


    
    </>
  );
}

export default CheckCustomer;
