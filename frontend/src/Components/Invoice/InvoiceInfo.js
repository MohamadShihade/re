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
  },
  container1: {
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
  container2: {
    width: "100%",
    marginTop: 0,
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 60,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  container2_1: {
    width: "100%",
    marginTop: 0,

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
  container2_2: {
    width: "100%",

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
    borderRight: 1,
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

const InvoiceInfo = ({ piInfo }) => (
  <View fixed style={styles.tableContainer}>
    <Row_1 />
    <Row_2 piInfo={piInfo} />
    <Row_3 />
    <Row_4 piInfo={piInfo} />
    <Row_5 />
    <Row_6 piInfo={piInfo} />
  </View>
);

export default InvoiceInfo;
