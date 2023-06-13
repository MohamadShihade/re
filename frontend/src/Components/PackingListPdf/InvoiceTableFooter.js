import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 39,
    textAlign: "center",
    fontSize: 10,
    flexGrow: 1,
  },
  col: {
    borderRightColor: borderColor,
    borderRightWidth: 1,

    width: "43%",
    flexDirection: "column",
  },
  col_row: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    fontSize: 8,
    height: 13,
    width: "100%",
    textAlign: "left",
    paddingLeft: "4px",
    paddingTop: 1,
  },
  col_rowNobutt: { fontSize: 8, height: 13, width: "100%", textAlign: "left", paddingLeft: "4px", paddingTop: 1 },
  bl: {
    backgroundColor: "#ccffdb",
    paddingTop: "15px",
    paddingLeft: "5px",
    height: "100%",
    width: "57%",
    fontSize: 9,
    textAlign: "left",
  },
});

const InvoiceTableFooter = ({ truckItem, fake }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.col}>
          <Text style={styles.col_row}>
            NETWEIGHT : {!fake ? Math.round(truckItem.truckNetWeight.toFixed(2)) : Math.round(truckItem.truckNetWeightFake).toFixed(2)} KG
          </Text>{" "}
          <Text style={styles.col_row}>
            GROSSWEIGHT :{" "}
            {!fake ? Math.round(truckItem.truckGrossWeight.toFixed(2)) : Math.round(truckItem.truckGrossWeightFake)?.toFixed(2)} KG
          </Text>{" "}
          <Text style={styles.col_rowNobutt}>PACKAGES : {truckItem.truckTotalPackages}</Text>
        </View>{" "}
        <Text style={styles.bl}>BL : {truckItem.truckBls}</Text>{" "}
      </View>
    </>
  );
};

export default InvoiceTableFooter;
