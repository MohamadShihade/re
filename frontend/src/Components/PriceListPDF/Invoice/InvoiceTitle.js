import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
    paddingLeft : "40%"
  },
});

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
