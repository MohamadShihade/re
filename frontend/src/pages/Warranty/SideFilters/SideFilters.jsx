import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import './side_filters_styles.css';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrency,
  changeLocation,
  setUsdToAedRate,
} from "../../../store/filtersSlice";
import {
  changeShowDatasheet,
  changeShowPrice,
  changeShowStock,
} from "../../../store/showingSlice";
import { availabiltyStatus, priceCurrency, priceOnLocation } from "../data";

const SideFilters = () => {
  const dispatch = useDispatch();
  //Side Filters//////////////////////////////////////////////

  const [showPrice, setShowPrice] = useState(
    useSelector((state) => state.show.showPrice)
  );
  const [showStock, setShowStock] = useState(
    useSelector((state) => state.show.showStock)
  );
  const [showDatasheet, setShowDatasheet] = useState(
    useSelector((state) => state.show.showDatasheet)
  );

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
  const [usdToAedRateUseState, setUsdToAedRateUseState] = useState(
    useSelector((state) => state.filters.usdToAedRate)
  );
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const handleCurrencyChange = (e) => {
    dispatch(changeCurrency(e.target.value));
  };
  const handleLocationChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLocation(e.target.value));
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  return (
    <div className="side_filters" > 
      {/* <div className="radio-toolbar" onChange={handleLocationChange}>
          <div className="form-group" >
            <input type="radio" id="freezone_id" name="freezone" onChange={()=>{}} checked={location==="freezone"} value="freezone" />
            <label htmlFor="freezone_id " className="ags-btn-main"> <i className="uil uil-exchange uil-lage "></i>  Freezone </label>
          </div>
          <div className="form-group" >
            <input type="radio" id="local_id" name="freezone" onChange={()=>{}} checked={location==="local"} value="local"/>
            <label htmlFor="local_id" className="ags-btn-main"><i className="uil uil-map-pin-alt uil-lage"></i> Local</label> 
          </div>
     </div> 
      */}
     <div className="radio-toolbar" onChange={handleLocationChange} >
        <div className="form-group" >
           <input type="radio" id="freezone"   name="location" checked={location==="freezone"} value="freezone"/>
           <label htmlFor="freezone" className="ags-btn-main" ><i className="uil uil-exchange uil-lage "></i> Freezone</label> 
        </div>
        <div className="form-group">
            <input type="radio" id="local" name="location" onChange={()=>{}} checked={location==="local"} value="local" />
          <label htmlFor="local" className="ags-btn-main"><i className="uil uil-map-pin-alt uil-lage"></i>Local</label>
        </div>
     </div>


     <div className="radio-toolbar" onChange={handleCurrencyChange} >
        <div className="form-group" >
           <input type="radio" id="usd_id"  checked={currency==="USD"} onChange={()=>{}}  name="radioFruitf" value="USD"/>
           <label htmlFor="usd_id" className="ags-btn-main" ><i className="uil uil-dollar-sign-alt uil-lage"></i> USD</label> 
        </div>
        <div className="form-group">
            <input type="radio" id="aed_id" checked={currency==="AED"}  onChange={()=>{}} name="radioFruitf" value="AED" />
          <label htmlFor="aed_id" className="ags-btn-main">AED</label>
        </div>
     </div>
    </div>
  );
};

export default SideFilters;


/*<Paper style={{ display: "flex", backgroundColor: "#c5d2d4" }}>
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox checked={showPrice} onChange={handleShowPriceChange} />
            }
            label='Price'
          />
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox checked={showStock} onChange={handleShowStockChange} />
            }
            label='Stock'
          />
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox
                checked={showDatasheet}
                onChange={handleShowDatasheetChange}
              />
            }
            label='Datasheet'
          />
        </Paper>
        <Paper>
          <TextField
            label='Promo Code'
            id='outlined-size-small'
            fullWidth
            variant='outlined'
            defaultValue=''
            size='medium'
          />
        </Paper>*/