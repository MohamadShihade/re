import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
  },
});

const SellerBuyer = ({ exporter, buyer }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.buyer}>Seller :</Text>
        <Text style={styles.buyer}>Buyer : {buyer.split(" ").slice(0, 6).join(" ")}</Text>
      </View>
    </>
  );
};

export default SellerBuyer;
