import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";
import Row_2 from "./InvoiceInfoRows/Row_2";

import Row_1 from "./InvoiceInfoRows/Row_1";

const tableRowsCount = 7;
const borderColor = "black";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black",
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  invoice_no_val: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date_val: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  buyer_address: {
    width: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const InvoiceInfo = ({ pkl }) => {
  return (
    <View style={styles.tableContainer}>
      <Row_1 pkl={pkl} />
      <Row_2 pkl={pkl} />
    </View>
  );
};

export default InvoiceInfo;
