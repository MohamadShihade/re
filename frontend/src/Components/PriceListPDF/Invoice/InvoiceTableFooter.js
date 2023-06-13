import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    fontSize: "10px",

    width: "85%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    fontSize: "10px",
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ products, currency, location,  discount ,additions ,usdToAedRate }) => {
  let currency_word = "";
  let sub_currency_word = "";
  if (currency === "USD") {
    currency_word = "Dollars ";
    sub_currency_word = "cent";
  } else {
    currency_word = "UAE Dirhams ";
    sub_currency_word = "fils";
  }
  //New with cents//////////////////////////////////////////////////////////////////////////////////
  const ones = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine "];
  const teen = ["ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];
  const tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const high = ["hundred ", "thousand ", "million ", "billion "];
  const tensOnes = (t, o) => (+t == 0 ? ones[+o] : +t == 1 ? teen[+o] : +t > 1 && +o == 0 ? tens[+t - 2] : tens[+t - 2] + "-" + ones[+o]);
  const fltN = (float) => [...parseFloat(float)?.toFixed(2)];
  const stepper = (array) => {
    const D = array[0];
    const C = array[1];
    let size = D.length;
    let word;
    switch (size) {
      case 0:
        word = C;
        break;
      case 1:
        word = tensOnes(0, D[0]) + currency_word + C;
        break;
      case 2:
        word = tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 3:
        word = tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 4:
        word = tensOnes(0, D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 5:
        word = tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 6:
        word = tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 7:
        word = tensOnes(0, D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 8:
        word = tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 9:
        word = tensOnes(0, D[8]) + high[0] + tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      case 10:
        word = tensOnes(0, D[9]) + high[3] + tensOnes(0, D[8]) + high[0] + tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + currency_word + C;
        break;
      default:
        break;
    }
    word = word.trim();
    word =
      word == "one " + currency_word
        ? "one " + currency_word
        : word == currency_word + "and one cent"
        ? "one " + sub_currency_word
        : word == "one " + currency_word + "and one " + sub_currency_word
        ? "one " + currency_word + "and one " + sub_currency_word
        : word == "and undefined-undefinedcents"
        ? ""
        : word;
    word = word
      .replace(/(thousand|million)\s(hundred)/g, "$1")
      .replace(/(million)\s(thousand)/g, "$1")
      .replace(/(tycents)/g, "ty " + sub_currency_word + "s")
      .replace(/(tydollars)/g, "ty " + currency_word);
    return word;
  };
  const moneyToEng = (number) => {
    let R = fltN(number);
    let dec, c, cents;
    dec = R.splice(-3, 3);
    c = tensOnes(dec[1], dec[2]);
    cents = c == "one " ? "and one " + sub_currency_word : c == "" ? "" : `and ${c}${sub_currency_word}s`;
    return stepper([R.reverse(), cents]);
  };
  //End cents/////////////////////////////////////////////////////////////////////////////////

  let total = 0;
  let UAERATE = 1;
  let price =0;

  console.log(usdToAedRate);
  if(currency === "AED"){
    UAERATE = usdToAedRate;
  }

  
  function calcTotal() {
    products.map((item) => {
      if(location === "freezone" && currency === "AED"){
        total += item.freezonePriceAED * item.qty ;
      }
      if(location === "local" && currency === "AED"){
        total += item.LocalPriceAED* item.qty;
      }
      if(location === "freezone" && currency === "USD"){
        total += item.freezonePrice* item.qty;
      }if(location === "local" && currency === "USD"){
        total += item.LocalPrice* item.qty;
      }
    });

  }
  calcTotal();
  console.log(total);

 
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {Number.parseFloat(total)?.toFixed(2)}&nbsp;{currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>DISCOUNT</Text>
        <Text style={styles.total}>
          {discount}&nbsp;{currency}
        </Text>
      </View> <View style={styles.row}>
        <Text style={styles.description}>ADDITIONS</Text>
        <Text style={styles.total}>
          {additions}&nbsp;{currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>{moneyToEng((total - discount) +parseInt(additions))}&nbsp;only</Text>
        <Text style={styles.total}>
          {Number.parseFloat((total - discount) +parseInt(additions))?.toFixed(2)}&nbsp;{currency}
        </Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
