import React from 'react'
import { useSelector } from 'react-redux';

const Price = ({ price , freezoneToLocalPercentage ,additionOnLocalPercentage }) => {
  let netToFreezonePer = freezoneToLocalPercentage;
   let freezoneToLocalPer = additionOnLocalPercentage;
    const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);  
   let freezonePrice =price+ price * netToFreezonePer / 100;
   let localPrice = freezonePrice + freezonePrice * freezoneToLocalPer / 100;

   

  return (
     <b style={{ backgroundColor: "#E0E5E4", color: "red" }}>
            {location === "freezone" ? (
              <>{currency === "USD" ? freezonePrice?.toFixed(2) + "  $" : ((freezonePrice * usdToAedRate * 100) / 100)?.toFixed(3) + "  AED"}</>
            ) : (
              <>{currency === "USD" ?
               (localPrice)?.toFixed(2) + "  $" 
              : ((localPrice * usdToAedRate * 100) / 100).toFixed(2) + "  AED"}</>
            )}
          </b>
  )
}

export default Price