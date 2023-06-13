import React from "react";
import { Page, Document, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import logo_ags from "./logo_ags.png";
import logo_ajc from "./logo_ajc.png";
import ags_stamp from "./ags_stamp.png";
import ajc_stamp from "./ajc_stamp.png";

import piFooter from "./pifooter.png";
import InvoiceInfo from "./InvoiceInfo";
import { useSelector } from "react-redux";
import InvoiceTerms from "./InvoiceTerms";
import SellerBuyer from "./SellerBuyer";
import BankDetails from "./BankDetails";
import PklFooter from "./PklFooter";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 15,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: "100%",
    height: 66,
    marginLeft: "0",
    marginRight: "0",
  },
  pi_footer: {
    width: "100%",
    marginLeft: "0",
    marginRight: "0",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    top: 3,
    right: 10,
    textAlign: "center",
    color: "black",
  },
  salesEngineer: {
    paddingTop: "3px",
    position: "relative",
    fontSize: 8,
    top: 3,
    right: 10,
    textAlign: "left",
    color: "#575454",
  },
});

const Invoice = ({ pkl, withPrice, fake }) => {
  console.log(pkl);
  let logo = logo_ags;
  console.log(pkl.exporter);
  if (
    pkl.exporter.includes(
      "ABDULJALIL CHHADA AUTO SPARE PARTS TRADING LLC DEIRA NAIF, AL MAKTOUM HOSPITAL ROAD    CONTACT:+971 558952656,   Email: info@jalil.ae"
    )
  ) {
    logo = logo_ajc;
  }

  return (
    <Document compress={true}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `page ${pageNumber} of ${totalPages}`} fixed />
        <Image style={styles.logo} src={logo} />
        <InvoiceTitle title="INVOICE/PACKING LIST" />
        <InvoiceInfo pkl={pkl} />
        {pkl.truckItems.map((truckItem) => (
          <InvoiceItemsTable currency={pkl.piCurrency} truckItem={truckItem} withPrice={withPrice} fake={fake} />
        ))}
        <PklFooter truckItems={pkl.truckItems} fake={fake} withPrice={withPrice} currency={pkl.piCurrency} />
        {/* <InvoiceItemsTable pkl={pkl} />
        <View wrap={false}>
          <SellerBuyer exporter={pkl.exporter} buyer={pkl.buyerAddress} />
          <Image style={styles.logo} src={stamp} />
        </View> */}
      </Page>
    </Document>
  );
};
export default Invoice;
