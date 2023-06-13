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
 
  note: {
    width: "100%",
    height : "100%",
    paddingLeft: "3px",
    paddingRight: "3px",
    paddingTop : 4 ,
    fontSize: "10px",
    textAlign : "left"
     },

});

const Row_3 = ({ piInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.note}>Notes  : &nbsp; {piInfo.note} </Text>
    </View>
  );
};

export default Row_3;
