import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "black",
    fontSize: "10px",
  },
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 40,
    textAlign: "center",
    flexGrow: 1,
  },
  exporter: {
    fontSize: "10px",

    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "20%",
    fontSize: "7px",
    padding: "2px",

    borderRightColor: borderColor,
  },
});

const Row_6 = ({ piInfo }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>{piInfo.partyOfDischarge}</Text>
        <Text style={styles.invoice_no}>{piInfo.finalDistination}</Text>
        <Text style={styles.date}>Check or Bank Transfer 100% in advance Before Shipping</Text>
      </View>
    </>
  );
};

export default Row_6;
