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
    height: 21,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  exporter: {
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,height : "100%"  ,paddingTop : 1
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,height : "100%"  ,paddingTop : 1
  },
  date: {
    width: "20%",
    borderRightColor: borderColor,height : "100%"  ,paddingTop : 1
  },
});

const Row_5 = ({ items }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>PARTY OF DISCHARGE</Text>
        <Text style={styles.invoice_no}>FINAL DESTINATION</Text>
        <Text style={styles.date}>PAYMENT TERMS</Text>
      </View>
    </>
  );
};

export default Row_5;
