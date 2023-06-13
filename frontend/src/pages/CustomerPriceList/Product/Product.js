import React, { useRef, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Checkbox, TextField, Paper, FormControlLabel, Switch } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCheckedList, removeProductFromCheckedList, setProductQty } from "../../../store/productSlice";

const Product = ({ product }) => {
  const selectedProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isPallet, setIsPallet] = useState(false);
  // const QtyRef = useRef('')

  const [qty, setQty] = useState(0);

  const classes = useStyles();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) {
      dispatch(addProductToCheckedList({ ...product, qty, isPallet }));
    } else {
      dispatch(removeProductFromCheckedList(product));
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
      <CardMedia
        style={{
          width: "auto",
          maxHeight: "200px",
        }}
        className={classes.media}
        image={product.image[0] || "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"}
      ></CardMedia>
      <Typography className={classes.title} gutterBottom variant="h6" component="h2">
        {product.code}
      </Typography>{" "}
      <Typography className={classes.capacity} gutterBottom variant="h6">
        Capacity :<b style={{ backgroundColor: "#87FFB0" }}>{product.capacity}</b>
      </Typography>
      <Typography className={classes.price} display="inline">
        Price :<b style={{ backgroundColor: "#E0E5E4", color: "red" }}> {product.price}</b>
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          DESCRIPTION :{product?.description.split(" ").splice(0, 10).join(" ")}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
