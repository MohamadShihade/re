import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: 10,
  },
  exporter: {
    height: "100%",
    width: "33%",
    borderRightColor: borderColor,
    borderRight: 1,
    paddingTop: 1,
  },

  no: {
    width: "17%",
    borderRightColor: borderColor,
    height: "100%",
    paddingTop: 1,
  },
  no1: {
    width: "17%",
    borderRight: 1,

    borderRightColor: borderColor,
    height: "100%",
    paddingTop: 1,
  },
});

const Row_1 = ({ pkl }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>CUSTOMER</Text>
        <Text style={styles.exporter}>BUYER ADDRESS</Text>
        <Text style={styles.no1}>NO:</Text>
        <Text style={styles.no}>{pkl.pklNo}</Text>
      </View>
    </>
  );
};

export default Row_1;
