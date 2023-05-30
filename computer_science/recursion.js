// pow(2, 4) = 2 * pow(2, 3)
// pow(2, 3) = 2 * pow(2, 2)
// pow(2, 2) = 2 * pow(2, 1)
// pow(2, 1) = 2

function recursivePow(a, n) {
  if (n === 1) return a;
  return a * recursivePow(a, n - 1);
}

// function recursivePow(a, n) {
//   return n === 1 ? a : a * recursivePow(a, n - 1);
// }

// function iterativePow(a, n) {
//   let b = a;
//   let m = n;
//   while (m > 1) {
//     b *= a;
//     m -= 1;
//   }
//   return b;
// }

function iterativePow(a, n) {
  let result = 1;

  for (let i = 0; i < n; i += 1) {
    result *= a;
  }
  // 0 2
  // 1 4
  // 2 8
  return result;
}

console.log("recursive pow:", recursivePow(2, 4));
console.log("iterative pow:", iterativePow(2, 4));

// Sum all numbers till the given one

// use for loop
// function sumTo(n) {
//   let sum = 0;
//   for (let i = 1; i <= n; i += 1) {
//     sum += i;
//   }
//   return sum;
// }

// use recursion
// function sumTo(n) {
//   return n === 1 ? n : n + sumTo(n - 1);
// }

// use arithmetic progression formula

function sumTo(n) {
  return (n * (1 + n)) / 2;
}

const n = 100;
console.log(`sum to ${n}:`, sumTo(n));
