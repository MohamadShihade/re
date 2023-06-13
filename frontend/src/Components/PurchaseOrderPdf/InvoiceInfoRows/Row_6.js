import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderColor: "black",
    backgroundColor: "white",

    alignItems: "center",
    height: 21,
    textAlign: "center",
    flexGrow: 1,
  },
  exporter: {
    fontSize: "10px",

    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
    height: "100%",
    paddingTop: 4,
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 4,
  },
  date: {
    width: "20%",

    borderRightColor: borderColor,
    height: "100%",
    paddingTop: 4,
  },
});

const Row_6 = ({ po }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>{po.portOfOrigin}</Text>
        <Text style={styles.invoice_no}>{po.portOfDischarge}</Text>
        <Text style={styles.date}>{po.incoterms[0]}</Text>
      </View>
    </>
  );
};

export default Row_6;
