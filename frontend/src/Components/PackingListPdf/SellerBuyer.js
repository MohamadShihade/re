import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    border: 1,
    borderBottom: 0,
    alignItems: "center",
    height: 18,
    fontSize: 10,
    fontStyle: "bold",
  },
  description: {
    fontSize: "8px",

    width: "85%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  total: {
    fontSize: "8px",
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  buyer: {
    textAlign: "center",
    fontSize: "9px",
    width: "50%",
    borderRight: 1,
  },
  seller: {
    textAlign: "center",
    fontSize: "7px",
    width: "50%",
  },
});

const SellerBuyer = ({ exporter, buyer }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.buyer}>Buyer :</Text>
        <Text style={styles.seller}>Seller : {exporter.split(".")[0]}</Text>
      </View>
    </>
  );
};

export default SellerBuyer;
