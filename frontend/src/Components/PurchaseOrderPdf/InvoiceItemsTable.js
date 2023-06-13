import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
    borderWidth: 1,
    borderColor: "black",
  },
});

const InvoiceItemsTable = ({ po }) => {
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader currency={po.currency} />
      <InvoiceTableRow po={po} />
      <InvoiceTableFooter po={po} />
    </View>
  );
};

export default InvoiceItemsTable;
