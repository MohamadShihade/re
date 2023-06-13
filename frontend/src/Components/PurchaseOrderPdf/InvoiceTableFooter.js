import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 18,
    fontSize: 10,
    fontStyle: "bold",
  },
  description: {
    fontSize: "8px",

    width: "85%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  total_word: {
    fontSize: "8px",

    width: "50%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  total_pcs: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  empty_space: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
    width: "20%",
  },
  total: {
    fontSize: "8px",
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  total_pcs_word: {},
  total_wieght_word: {},
  total_wieght: {},
  weight_word: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: "8px",
    width: "12.5%",
    textAlign: "center",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
  weight_val: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: "8px",
    width: "12.5%",
    textAlign: "center",
    paddingRight: 8,
    height: "100%",
    paddingTop: 2,
  },
});

const InvoiceTableFooter = ({ po }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Sub Total</Text>
        <Text style={styles.total}>
          {po.subTotalAmount.toFixed(2)}&nbsp;{po.currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>DISCOUNT ( {po.discount} % )</Text>
        <Text style={styles.total}>
          {((po.subTotalAmount * parseInt(po.discount)) / 100).toFixed(2)}&nbsp;{po.currency}
        </Text>
      </View>{" "}
      <View style={styles.row}>
        <Text style={styles.description}>{po.totalAmountInWords}&nbsp;only</Text>
        <Text style={styles.total}>
          {po.totalAmount.toFixed(2)}&nbsp;{po.currency}
        </Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
