import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 50,
    textAlign: "center",
    flexGrow: 1,
  },

  consignee: {
    fontSize: "9px",
    padding: "3px 2px",
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
    height: "100%",
    paddingTop: 4,
  },

  notify_party: {
    fontSize: "9px",
    width: "50%",
    padding: "0px 2px",
    height: "100%",
    paddingTop: 4,
  },
});

const Row_4 = ({ po }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.consignee}>{po.consignee}</Text>
        <Text style={styles.notify_party}>{po.notifyParty}</Text>
      </View>
    </>
  );
};

export default Row_4;
