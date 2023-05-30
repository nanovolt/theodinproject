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

// calculate factorial

function factorial(factN) {
  return factN === 1 ? 1 : factN * factorial(factN - 1);
}

const factN = 5;

console.log(`${factN}! =`, factorial(factN));

// fibonacci numbers

// eslint-disable-next-line no-shadow
// function fib(n) {
//   if (n === 1) {
//     return 1;
//   }
//   if (n === 0) {
//     return 0;
//   }

//   return fib(n - 1) + fib(n - 2);
// }

// eslint-disable-next-line no-shadow
// function fib(n) {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// eslint-disable-next-line no-shadow
// function fib(n) {
//   const arr = [];

//   for (let i = 0; i < n; i += 1) {
//     if (i < 2) {
//       arr.push(1);
//     } else {
//       arr.push(arr[i - 1] + arr[i - 2]);
//     }
//   }

//   return arr[n - 1];
// }

// eslint-disable-next-line no-shadow
function fib(n) {
  let first = 1;
  let second = 1;
  let sum = 0;
  for (let i = 3; i <= n; i += 1) {
    sum = first + second;
    first = second;
    second = sum;
  }

  return second;
}

const fibN = 7;

console.log(`fibonacci of ${fibN}:`, fib(fibN));
