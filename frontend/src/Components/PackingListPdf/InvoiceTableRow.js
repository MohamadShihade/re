import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 9,
    flexGrow: 1,
  },
  containerTotal: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 9,
    flexGrow: 1,
  },
  no: { width: "3%", borderRightColor: borderColor, borderRightWidth: 1, height: "100%", paddingTop: 1 },

  description: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
    fontSize: 8,
  },
  amount: { borderRightColor: borderColor, borderRightWidth: 1, width: "11%", height: "100%", paddingTop: 1 },

  amount2: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
  },
  amountTotal: { borderRightColor: borderColor, borderRightWidth: 1, width: "11%", height: "100%", paddingTop: 1, fontWeight: "bold" },

  amount2Total: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
    fontWeight: "bold",
  },
  descriptionTotal: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
    fontSize: 7,
  },
});

const InvoiceTableRow = ({ truckItem, withPrice, fake, currency }) => {
  let no = 0;
  const rows = truckItem.truckProductItems.map((item, index) => (
    <View wrap={true} style={styles.container} key={index}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.productCategory}&nbsp;
        {item.productCode}&nbsp;/&nbsp;{item.productCapacity}&nbsp;{item.productBrand}
      </Text>
      <Text style={styles.amount}>{item.productQty}</Text>
      <Text style={styles.amount}>{item.productPalletQty}</Text>
      <Text style={styles.amount}>{!fake ? item.productTotalNetWeight.toFixed(2) : item.productTotalNetWeightFake.toFixed(2)}</Text>
      <Text style={styles.amount}>{!fake ? item.productTotalGrossWeight.toFixed(2) : item.productTotalGrossWeightFake?.toFixed(2)}</Text>
      <Text style={styles.amount2}>{withPrice && item.productTotalAmount.toFixed(2)}</Text>
    </View>
  ));
  return (
    <Fragment>
      {rows}
      <View wrap={true} style={styles.containerTotal}>
        <Text style={styles.no}> </Text>
        <Text style={styles.descriptionTotal}>TOTAL</Text>
        <Text style={styles.amountTotal}>{truckItem.truckTotalPackages}</Text>
        <Text style={styles.amountTotal}>{truckItem?.truckTotalPallets}</Text>
        <Text style={styles.amountTotal}>
          {!fake ? Math.round(truckItem.truckNetWeight).toFixed(2) : Math.round(truckItem.truckNetWeightFake).toFixed(2)}
        </Text>
        <Text style={styles.amountTotal}>
          {!fake ? Math.round(truckItem.truckGrossWeight).toFixed(2) : Math.round(truckItem.truckGrossWeightFake)?.toFixed(2)}
        </Text>
        <Text style={styles.amount2Total}>{withPrice && truckItem?.truckTotalAmount.toFixed(2)}</Text>
      </View>
    </Fragment>
  );
};

export default InvoiceTableRow;
