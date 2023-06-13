import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, changeLocation, setUsdToAedRate } from '../../store/filtersSlice';
import { changeShowDatasheet, changeShowPrice, changeShowStock } from '../../store/showingSlice';

const ShowAndPriceFilters = () => {
    const dispatch = useDispatch();
     const [showPrice, setShowPrice] = useState(useSelector((state) => state.show.showPrice));
  const [showStock, setShowStock] = useState(useSelector((state) => state.show.showStock));
  const [showDatasheet, setShowDatasheet] = useState(useSelector((state) => state.show.showDatasheet));
  const handleShowPriceChange = (e) => {
    setShowPrice(e.target.checked);
    dispatch(changeShowPrice(!showPrice));
  };
  const handleShowStockChange = (e) => {
    setShowStock(e.target.checked);
    dispatch(changeShowStock(!showStock));
  };

  const handleShowDatasheetChange = (e) => {
    setShowDatasheet(e.target.checked);
    dispatch(changeShowDatasheet(!showDatasheet));
  };
     ////////////////////////////////////////////Usd To Aed //////
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  const [usdToAedRateUseState, setUsdToAedRateUseState] = useState(useSelector((state) => state.filters.usdToAedRate));
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const handleCurrencyChange = (e) => {
    dispatch(changeCurrency(e.target.value));
  };
  const handleLocationChange = (e) => {
    dispatch(changeLocation(e.target.value));
  };
  return (
 <div class="parent">
  <div class="div1" value="all" > All </div>
  <div class="div2" value="available">  Available</div>
  <div class="div3" value = "comming"> Comming </div>
  <div class="div4" value = "booked">  Booked</div>
  <div class="div5" value = "local"> Local </div>
  <div class="div6" value="freezone"> Freezone</div>
  <div class="div7" value="USD"> USD </div>
  <div class="div8" value="AED">  AED </div>
  <div class="div9"> 
  <input type="text" value={usdToAedRateUseState} 
  onChange={(e) => setUsdToAedRateUseState(e.target.value)}
  autocomplete="on"
  onBlur={(e) => {
    dispatch(setUsdToAedRate(usdToAedRateUseState));
  }}/>

 </div>
  <div class="div10"> 
    
  
    <input type="checkbox" name="" id=""  autocomplete="on"/>
       
    <input type="checkbox" name="" id="" autocomplete="on"/>
       
    <input type="checkbox" name="" id="" autocomplete="on"/>
  </div>
  <div class="div11"> 
    <input type="text" name="" id="" autocomplete="on"/>
  </div>

  <p>List of usdt</p>
  </div>
  )
}

export default ShowAndPriceFilters