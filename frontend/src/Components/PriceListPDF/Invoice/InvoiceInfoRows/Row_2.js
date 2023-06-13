import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTop : 1,
    borderColor: "black",
    backgroundColor: "white",
   
    alignItems: "center",
    height: 25,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
 
  exporter_val: {
    width: "80%",
    height : "100%",
    paddingLeft: "3px",
    paddingRight: "3px",
    paddingTop : 4 ,
    fontSize: "10px",
    borderRight : 1,
    textAlign : "left"
     },

  invoice_no: {
    width: "157px",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    alignItems: "center",
    textAlign: "center",
  },
  invoice_no_val: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date_val: {
    width: "40%",
    borderRightColor: borderColor,
  },
});

const Row_2 = ({ piInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exporter_val}>Final Destination  : &nbsp; {piInfo.finalDistination} </Text>
      <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{piInfo.date}</Text>
    </View>
  );
};

export default Row_2;
