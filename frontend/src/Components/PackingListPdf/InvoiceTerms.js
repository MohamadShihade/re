import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { terms_collections } from "../../data/invoice-data";
import { useEffect } from "react";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderLeft: 1,
    borderRight: 1,
    alignItems: "center",
    height: 16,
    fontSize: "8px",
    fontStyle: "bold",
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
    height: 15,
    textAlign: "left",
    flexGrow: 1,
  },
  no: {
    width: "4%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 0,
  },
  description: {
    paddingLeft: "5px",
    fontSize: "8px",
    width: "96%",
  },
  header: {
    paddingLeft: "5px",
    width: "100%",
  },
  seller: {
    textAlign: "center",
    fontSize: "16px",
    width: "50%",
  },
  buyer: {
    textAlign: "center",
    fontSize: "9px",
    width: "50%",
  },
});

const InvoiceTerms = ({ terms, paymentPercentage, deliveryDate }) => {
  console.log(deliveryDate);
  console.log(terms[0]);
  let allTerms = terms_collections.filter((coll) => {
    return coll.collection === terms[0];
  })[0].terms;
  useEffect(() => {
    let deliveryDate_term = `Goods will be delivered with in ${deliveryDate} days after completion of full payment`;
    let aditionali_term = `Advance Payment ${paymentPercentage}% Balance to be paid time providing copy of BL`;
    allTerms.unshift(deliveryDate_term);
    allTerms.unshift(aditionali_term);
  }, []);
  const allTermsUnique = [...new Set(allTerms)];

  console.log(allTerms);

  return (
    <View wrap={true}>
      <View style={styles.row}>
        <Text style={styles.header}>Terms and Conditions : </Text>
      </View>
      {allTermsUnique?.length > 0
        ? allTermsUnique.map((item, index) => (
            <View wrap={false} key={index} style={styles.row}>
              <Text style={styles.no}>{index + 1}</Text>
              <Text style={styles.description}>{item}</Text>
            </View>
          ))
        : null}
    </View>
  );
};

export default InvoiceTerms;
