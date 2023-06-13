import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 70,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  container2Withbott: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 35,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  container2: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 35,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  col_container: {
    width: "34%",
    flexDirection: "column",
  },
  // customer: {
  //   height: "100",
  //   paddingBottom: "6px",
  //   paddingTop: "7px",
  //   borderRight: 1,
  //   width: "33%",
  //   paddingLeft: "3px",
  //   paddingRight: "3px",
  //   fontSize: "10px",
  //   borderRightColor: borderColor,
  // },

  invoice_no: {
    paddingTop: "10px",
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  customer: {
    width: "33%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
  },
  date: {
    paddingTop: "10px",

    width: "50%",

    height: "100%",
  },
});

const Row_2 = ({ pkl }) => {
  const date = Date(pkl.createdAt);
  const date_val = new Date(date);
  return (
    <View style={styles.container}>
      <Text style={styles.customer}>{pkl.customer} </Text>
      <Text style={styles.customer}>{pkl.buyerAddress} </Text>
      <View style={styles.col_container}>
        <View style={styles.container2Withbott}>
          <Text style={styles.invoice_no}>Date</Text>
          <Text style={styles.date}>{date_val.toLocaleDateString()}</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.invoice_no}>INV NO</Text>
          <Text style={styles.date}>{pkl.invoiceNo}</Text>
        </View>
      </View>
    </View>
  );
};

export default Row_2;
