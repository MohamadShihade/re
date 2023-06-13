import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 50,
    textAlign: "center",
    //fontStyle: "bold",
    flexGrow: 1,
  },
  consignee: {
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

const Row_4 = ({ piInfo }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.consignee}>{piInfo.consignee}</Text>
        <Text style={styles.notify_party}>{piInfo.notifyParty}</Text>
      </View>
    </>
  );
};

export default Row_4;
