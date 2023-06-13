import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 90,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  container2: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 21,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  col_container: {
    width: "50%",
    flexDirection: "column",
  },
  exporter_val: {
    height: "100",
    paddingBottom: "6px",
    paddingTop: "7px",
    borderRight: 1,
    width: "50%",
    paddingLeft: "3px",
    paddingRight: "3px",
    fontSize: "10px",
    borderRightColor: borderColor,
  },

  invoice_no: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
  },
  date: {
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    paddingTop: 1,
  },
  invoice_no_val: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date_val: {
    width: "40%",
  },
});

const Row_2 = ({ po }) => {
  const date = Date(po.createdAt);
  const date_val = new Date(date);
  return (
    <View style={styles.container}>
      <Text style={styles.exporter_val}>{po.exporter} </Text>
      <View style={styles.col_container}>
        <View style={styles.container2}>
          <Text style={styles.invoice_no}>&nbsp;&nbsp;&nbsp;{po.po_no}</Text>

          <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date_val.toLocaleDateString()}</Text>
        </View>
        <Text style={{ width: "100%", paddingTop: "3px" }}>BUYER ADDRESS</Text>
        <Text style={{ padding: "2px", height: "50px", width: "100%", borderTop: 1, fontSize: "10" }}>{po.buyerAddress}</Text>
      </View>
    </View>
  );
};

export default Row_2;
