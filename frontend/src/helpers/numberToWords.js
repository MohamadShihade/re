const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

const scales = ["", "thousand", "million", "billion", "trillion"];
export function numberToWords(number) {
  if (number === 0) {
    return "zero";
  }

  const parts = number.toString().split(".");
  let integerPart = parseInt(parts[0]);
  let decimalPart = parseInt(parts[1] || 0);

  let result = "";

  // Convert integer part
  if (integerPart === 0) {
    result = "zero";
  } else {
    let scaleIndex = 0;
    while (integerPart > 0) {
      const chunk = integerPart % 1000;
      if (chunk !== 0) {
        const chunkWords = convertChunk(chunk);
        result = chunkWords + " " + scales[scaleIndex] + " " + result;
      }
      integerPart = Math.floor(integerPart / 1000);
      scaleIndex++;
    }
    result = result.trim();
  }

  // Convert decimal part
  if (decimalPart !== 0) {
    const decimalWords = convertChunk(decimalPart);
    result += " and " + decimalWords + " cents";
  }

  return result.trim();
}

function convertChunk(chunk) {
  const chunkArray = chunk.toString().split("").map(Number);
  let chunkWords = "";
  if (chunkArray.length === 3) {
    chunkWords += ones[chunkArray[0]] + " hundred ";
    chunkArray.shift();
  }
  if (chunkArray.length === 2) {
    if (chunkArray[0] === 1) {
      chunkWords += ones[chunkArray.join("")];
      chunkArray.splice(0, 2);
    } else if (chunkArray[0] > 1) {
      chunkWords += tens[chunkArray[0]] + " ";
      chunkArray.shift();
    }
  }
  if (chunkArray.length === 1) {
    chunkWords += ones[chunkArray[0]];
  }
  return chunkWords.trim();
}
