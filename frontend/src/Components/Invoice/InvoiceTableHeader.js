import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  no: { width: "5%", borderRightColor: borderColor, borderRightWidth: 1, height: "100%", paddingTop: 4 },
  description: {
    width: "45%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 4,
  },

  qty: {
    width: "15%",
    fontSize: "8px",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 4,
  },
  price: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 4,
  },
  amount: {
    width: "15%",
    height: "100%",
    paddingTop: 4,
  },
});

const InvoiceTableHeader = ({ currency }) => (
  <View style={styles.container}>
    <Text style={styles.no}>No</Text>
    <Text style={styles.description}>ITEMS</Text>
    <Text style={styles.qty}>QTY(PCS/WATTS)</Text>
    <Text style={styles.price}>UNIT PRICE ({currency})</Text>
    <Text style={styles.amount}>TOTAL {currency}</Text>
  </View>
);

export default InvoiceTableHeader;
