import { Checkbox, FormControlLabel, Grid, Paper, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, changeLocation, setUsdToAedRate } from '../../../store/filtersSlice';
import { changeShowDatasheet, changeShowPrice, changeShowStock } from '../../../store/showingSlice';
import { availabiltyStatus, priceCurrency, priceOnLocation } from '../data';

const SideFilters = () => {
const dispatch = useDispatch();
 //Side Filters//////////////////////////////////////////////

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

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  return (
    <div><Grid item xs={12} sm={6} md={3}>
                <ToggleButtonGroup fullWidth value={["rr","rr"]} onChange={() => {}} aria-label="text formatting">
                  {availabiltyStatus.map((status, i) => {
                    return (
                      <ToggleButton key={i} value={status} aria-label={status}>
                        {status}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
                <ToggleButtonGroup fullWidth value={location} onChange={handleLocationChange} aria-label="text formatting">
                  {priceOnLocation.map((location, i) => {
                    return (
                      <ToggleButton key={i} value={location} aria-label={location}>
                        {location}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
                <div style={{ display: "flex" }}>
                  <ToggleButtonGroup style={{ flex: 2 }} value={currency} onChange={handleCurrencyChange} aria-label="text formatting">
                    {priceCurrency.map((curr, i) => {
                      return (
                        <ToggleButton style={{ flex: 2 }} key={i} value={curr} aria-label={curr}>
                          {curr}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                  <TextField
                    style={{ flex: 1 }}
                    placeholder="Rate"
                    color="primary"
                    value={usdToAedRateUseState}
                    onChange={(e) => setUsdToAedRateUseState(e.target.value)}
                    onBlur={(e) => {
                      dispatch(setUsdToAedRate(usdToAedRateUseState));
                    }}
                    variant="outlined"
                  ></TextField>
                </div>
                <Paper style={{ display: "flex", backgroundColor: "#c5d2d4" }}>
                  <FormControlLabel style={{ flex: 1 }} control={<Checkbox checked={showPrice} onChange={handleShowPriceChange} />} label="Price" />
                  <FormControlLabel style={{ flex: 1 }} control={<Checkbox checked={showStock} onChange={handleShowStockChange} />} label="Stock" />
                  <FormControlLabel style={{ flex: 1 }} control={<Checkbox checked={showDatasheet} onChange={handleShowDatasheetChange} />} label="Datasheet" />
                </Paper>
                <Paper>
                  <TextField label="Promo Code" id="outlined-size-small" fullWidth variant="outlined" defaultValue="" size="medium" />
                </Paper>
              </Grid></div>
  )
}

export default SideFilters