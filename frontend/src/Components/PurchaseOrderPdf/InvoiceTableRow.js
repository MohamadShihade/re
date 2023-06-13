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

const InvoiceTableRow = ({ po }) => {
  let no = 0;
  const rows = po.products.map((item, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.brand}&nbsp;
        {item.code}&nbsp;/&nbsp;{item.capacity}
      </Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.price}>
        {item.price}
        &nbsp;&nbsp;
        {po.currency}
      </Text>
      <Text style={styles.amount}>
        {item.qty > 0 ? (item.qty * item.price)?.toFixed(2) : 0}&nbsp;&nbsp;
        {po.currency}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
