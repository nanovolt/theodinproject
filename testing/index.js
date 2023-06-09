function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

function caesarCipher(str, shift) {
  const codes = [];
  let code = 0;
  let newCode = 0;
  let n = 0;
  for (let i = 0; i < str.length; i += 1) {
    code = str.charCodeAt(i);
    newCode = code + shift;

    // console.log("letter:", str[i], "code:", code);

    if (newCode > 122) {
      n = newCode - 122;
      newCode = 96 + n;
    }
    // console.log("new letter:", String.fromCharCode(newCode), "new:", newCode);

    codes.push(newCode);
  }
  // console.log(...codes);
  // console.log(String.fromCharCode(...codes));

  return String.fromCharCode(...codes);
}

caesarCipher("abcdefghijklmnopqrstuvwxyz", 3);

function getAverage(arr) {
  return arr.reduce((acc, next) => acc + next, 0) / arr.length;
}

function getMax(arr) {
  let max = arr[0];
  arr.forEach((item) => {
    if (item > max) {
      max = item;
    }
  });
  return max;
}

function getMin(arr) {
  let min = arr[0];
  arr.forEach((item) => {
    if (item < min) {
      min = item;
    }
  });
  return min;
}

function analyzeArray(arr) {
  return {
    average: getAverage(arr),
    min: getMin(arr),
    max: getMax(arr),
    length: arr.length,
  };
}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };
