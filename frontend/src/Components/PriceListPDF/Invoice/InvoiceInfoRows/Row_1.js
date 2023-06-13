import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 21,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  exporter: {
    paddingTop : 4,
    height : "100%",
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
    textAlign : "left",
    paddingLeft : 4 
  },
  phone: {
    paddingTop : 4,
    height : "100%",
    width: "30%",
    borderRightColor: borderColor,
    borderRight: 1,
    textAlign : "left",
    paddingLeft : 4 
  },

  invoice_no: {
    paddingTop : 4,
    height : "100%",
    width: "30%",
    
  },
  date: {
    paddingTop : 4,
    height : "100%",
    width: "20%",
    borderRightColor: borderColor,
  },
});

const Row_1 = ({ piInfo }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>CUSTOMER : &nbsp; {piInfo.buyerAdress} </Text>
        <Text style={styles.phone}>Phone : &nbsp; {piInfo.phoneNumber} </Text>

        <Text style={styles.date}>DATE</Text>
      </View>
    </>
  );
};

export default Row_1;
