import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "black",
  },
  container: {
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
  consignee: {
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,height : "100%"  ,paddingTop : 1
  },

  notify_party: {
    width: "50%",
    borderRightColor: borderColor,height : "100%"  ,paddingTop : 1
  },
});

const Row_3 = ({ items }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.consignee}>CONSIGNEE</Text>
        <Text style={styles.notify_party}>NOTIFY PARTY</Text>
      </View>
    </>
  );
};

export default Row_3;
