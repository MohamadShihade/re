import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product/Product";
import useStyles from "./styles";
const CustomerPriceList = () => {
  const products = useSelector((state) => state.priceList.chosenProducts);
  const classes = useStyles();
  console.log("CustomerPriceList");
  return (
    <>
      <Grid container className={classes.mainContainer} alignItems="stretch" spacing={3}>
        {products ? (
          products?.map((product) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Grid>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>
    </>
  );
};

export default CustomerPriceList;
