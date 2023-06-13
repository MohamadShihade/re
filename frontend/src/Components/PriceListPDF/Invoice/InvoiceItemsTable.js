import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableRowsCount = 7;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
    borderWidth: 1,
    borderColor: "black",
  },
});

const InvoiceItemsTable = ({ products, currency,location, discount, usdToAedRate , additions }) => 
{
  console.log(location);
  return(
  <View style={styles.tableContainer}>
    <InvoiceTableHeader currency={currency} />
    <InvoiceTableRow products={products} currency={currency} location={location} usdToAedRate={usdToAedRate}/>
  </View>
)};

export default InvoiceItemsTable;
