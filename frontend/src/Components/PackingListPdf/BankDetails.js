import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { bank_details } from "./data";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    alignItems: "center",
    fontSize: "8px",
    fontStyle: "bold",
  },
  container: { border: 1 },
  no: {
    width: "4%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 0,
  },
  description: {
    paddingLeft: "5px",
    fontSize: "8px",
    width: "96%",
  },
  header: {
    paddingTop: "5px",
    paddingLeft: "5px",
    width: "100%",
  },
  seller: {
    textAlign: "center",
    fontSize: "16px",
    width: "50%",
  },
  buyer: {
    textAlign: "center",
    fontSize: "9px",
    width: "50%",
  },
});

const BankDetails = ({ bankDetails }) => (
  <View wrap={false} style={styles.container}>
    <Text style={styles.header}>Bank Details : </Text>
    {bankDetails?.length > 0
      ? bankDetails.map((item, index) => (
          <View wrap={false} key={index} style={styles.row}>
            <Text style={styles.description}>
              {bank_details
                .filter((bank_item) => bank_item.collection === item)[0]
                .terms.map((term) => {
                  return term + "\n";
                })}
            </Text>
          </View>
        ))
      : null}
  </View>
);

export default BankDetails;
