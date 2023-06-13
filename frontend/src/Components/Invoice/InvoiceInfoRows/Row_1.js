import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
 
  container: {
    flexDirection: "row",
   
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
    height : "100%"  ,
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height : "100%"  ,paddingTop : 1
  },
  date: {
    width: "20%",
    borderRightColor: borderColor,
    height : "100%"  ,paddingTop : 1
  },
});

const Row_1 = ({ items }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>EXPORTER</Text>
        <Text style={styles.invoice_no}>NO</Text>
        <Text style={styles.date}>DATE</Text>
      </View>
    </>
  );
};

export default Row_1;
