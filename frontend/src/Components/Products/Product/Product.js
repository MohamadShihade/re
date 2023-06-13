import React, { useRef, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Checkbox,
  TextField,
  Paper,
  FormControlLabel,
  Switch,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addToPriceList, removeFromPriceList } from "../../../store/priceListSlice";
import { addProductToCheckedList, removeProductFromCheckedList, setProductQty } from "../../../store/productSlice";

const Product = ({ product }) => {
  const selectedProducts = useSelector((state) => state.priceList.chosenProducts);
  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);
  const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  const productExists = selectedProducts.find((item) => item._id === product._id);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(productExists);
  const [isPallet, setIsPallet] = useState(false);

  // const QtyRef = useRef('')

  const [qty, setQty] = useState("");

  const classes = useStyles();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) {
      dispatch(addToPriceList(product));
    } else {
      dispatch(removeFromPriceList(product));
    }
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };
  const handleDownloadDatasheet = () => {
    console.log("Datasheet downloaded");
  };

  let stock = 0;
  product.bl.map((item) => {
    stock = stock + item.qty;
  });

  return (
    <Card className={classes.card} raised elevation={6}>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        style={{
          transform: "scale(2)",
        }}
      />
      <CardMedia
        style={{
          width: "auto",
          maxHeight: "200px",
        }}
        className={classes.media}
        image={product.image[0] || "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"}
      ></CardMedia>
      <div className={classes.overlay}></div>
      <Typography className={classes.title} variant="h6" component="h2">
        {product.code}
      </Typography>{" "}
      <Typography className={classes.capacity} variant="h6">
        Capacity :<b style={{ backgroundColor: "#87FFB0" }}> {product.capacity}</b>
      </Typography>
      {showPrice && (
        <Typography className={classes.price} style={{ display: "inline" }}>
          Price :
          <b style={{ backgroundColor: "#E0E5E4", color: "red" }}>
            {location === "freezone" ? (
              <>
                {currency === "USD"
                  ? product.freezonePrice + "  $"
                  : ((product.freezonePrice * usdToAedRate * 100) / 100)?.toFixed(3) + "  AED"}
              </>
            ) : (
              <>
                {currency === "USD"
                  ? product.LocalPrice + product.price / 10 + "  $"
                  : (((product.LocalPrice + product.LocalPrice / 10) * usdToAedRate * 100) / 100)?.toFixed(3) + "  AED"}
              </>
            )}
          </b>
        </Typography>
      )}
      {showStock && (
        <Typography className={classes.stock} style={{ display: "inline" }}>
          Stock :<b style={{ backgroundColor: "#E0E5E4" }}> {stock}</b>
        </Typography>
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          DESCRIPTION :{product?.description.split(" ").splice(0, 10).join(" ")}
          ...
        </Typography>
        {isChecked && (
          <div className={classes.if_checked}>
            <Typography className={classes.qty} variant="h5">
              Qty :
            </Typography>
            <TextField
              className={classes.qty_text}
              value={qty}
              onChange={handleQtyChange}
              onBlur={() => {
                dispatch(setProductQty({ id: product._id, qty: qty }));
              }}
            />
            <FormControlLabel
              className={classes.palet}
              control={
                <Switch
                  onChange={() => {
                    setIsPallet(!isPallet);
                  }}
                  checked={isPallet}
                />
              }
              label="Palet"
            />
          </div>
        )}
      </CardContent>
      {/* {showDatasheet && (
        <CardActions className={classes.cardActions}>
          <Button variant="contained" size="large" fullWidth color="primary" onClick={handleDownloadDatasheet}>
            Download Datasheet <i class="uil uil-arrow-to-bottom"></i>
          </Button>
        </CardActions>
      )} */}
    </Card>
  );
};

export default Product;
