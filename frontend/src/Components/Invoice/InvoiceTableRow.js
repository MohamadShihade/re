import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 20,
    fontStyle: "bold",
    fontSize: "9px",
  },
  no: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 4,
  },
  description: {
    width: "45%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
    height: "100%",
    paddingTop: 2,
  },
  qty: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  price: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
});

const InvoiceTableRow = ({ products, currency, location, usdToAedRate }) => {
  console.log({ products, currency, location, usdToAedRate });
  function calcPrice(item) {
    let price = 0;
    if (location === "freezone" && currency === "AED") {
      price = item.freezonePriceAED;
    }
    if (location === "local" && currency === "AED") {
      price = item.LocalPriceAED;
    }
    if (location === "freezone" && currency === "USD") {
      price = item.freezonePrice;
    }
    if (location === "local" && currency === "USD") {
      price = item.LocalPrice;
    }

    return price;
  }
  let no = 0;
  const rows = products.map((item, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.brand}&nbsp;
        {item.code}&nbsp;/&nbsp;{item.capacity}
      </Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.price}>
        {calcPrice(item)?.toFixed(`${item.category === "Solar" ? 4 : 2}`)}
        &nbsp;&nbsp;
        {currency}
      </Text>
      <Text style={styles.amount}>
        {item.qty > 0 ? (item.qty * calcPrice(item))?.toFixed(2) : 0}&nbsp;&nbsp;
        {currency}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
