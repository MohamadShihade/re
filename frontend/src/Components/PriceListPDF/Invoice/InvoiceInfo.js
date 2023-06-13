import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";
import Row_1 from "./InvoiceInfoRows/Row_1";
import Row_2 from "./InvoiceInfoRows/Row_2";
import Row_3 from "./InvoiceInfoRows/Row_3";
import Row_4 from "./InvoiceInfoRows/Row_4";
import Row_5 from "./InvoiceInfoRows/Row_5";
import Row_6 from "./InvoiceInfoRows/Row_6";

const tableRowsCount = 7;
const borderColor = "black";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black",
  }
});

const InvoiceInfo = ({ piInfo }) => (
  <View style={styles.tableContainer}>
    <Row_1 piInfo={piInfo} />
    <Row_2 piInfo={piInfo} />
    <Row_3 piInfo={piInfo} />
    
  </View>
);

export default InvoiceInfo;
