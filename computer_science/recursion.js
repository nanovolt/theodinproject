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

const list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

// eslint-disable-next-line no-shadow
// function printList(list) {
//   console.log("value:", list.value);
//   if (list.next) {
//     printList(list.next);
//   }
// }

// eslint-disable-next-line no-shadow
// function printList(list) {
//   // console.log("list:", list);
//   let { value, next } = list;
//   // console.log(next);
//   const arr = [];
//   while (next) {
//     console.log("value:", value);
//     arr.push(value);
//     // console.log("next:", next);
//     value = next.value;
//     next = next.next;
//     if (!next) {
//       console.log("value:", value);
//       arr.push(value);
//     }
//   }
//   // console.log(arr);
// }

// eslint-disable-next-line no-shadow
function printList(list) {
  let next = list;

  while (next) {
    console.log("value:", next.value);
    next = next.next;
  }
}

// eslint-disable-next-line no-shadow
// function printReverseList(list) {
//   // console.log("value:", list.value);
//   if (list.next) {
//     printReverseList(list.next);
//   }
//   console.log("reverse:", list.value);
// }

// eslint-disable-next-line no-shadow
function printReverseList(list) {
  let next = list;
  const arr = [];
  while (next) {
    arr.push(next.value);
    next = next.next;
  }
  arr.reverse().forEach((a) => {
    console.log("reverse:", a);
  });
}

printList(list);
printReverseList(list);

let count = 0;
const arr = [];
// eslint-disable-next-line no-shadow
function collatz(n) {
  if (n === 1) {
    arr.push(n);
    return count;
  }
  if (n % 2 === 0) {
    arr.push(n);
    collatz(n / 2);
    count += 1;
    return count;
  }
  if (n % 2 !== 0) {
    arr.push(n);
    collatz(3 * n + 1);
    count += 1;
    return count;
  }
  return count;
}

const c = 50;
console.log(`collatz of ${c}:`, collatz(c));
console.log(arr);

// eslint-disable-next-line no-shadow
function sumRange(n) {
  return n === 1 ? n : n + sumRange(n - 1);
}

console.log("sumRange(3):", sumRange(3));

function power(base, exp) {
  return exp === 0 ? 1 : base * power(base, exp - 1);
}

console.log("power(2, 4):", power(2, 4));

// eslint-disable-next-line no-shadow
function fact(n) {
  return n === 1 ? n : n * fact(n - 1);
}

console.log("fasct(5):", fact(5));

const allArr = [1, 3, 4, 5, 7, 8];
// console.log("splice", allArr.slice(0, -1));
// function all(arr, cb) {
//   let a = true;
//   arr.forEach((item) => {
//     a = cb(item);
//     if (!a) {
//       a = false;
//     }
//   });
//   return a;
// }

// eslint-disable-next-line no-shadow
function all(arr, cb) {
  if (arr.length === 0) return true;

  if (cb(arr.at(-1))) {
    return all(arr.slice(0, -1), cb);
  }
  return false;
}

console.log(
  "all:",
  all(allArr, (a) => a < 9)
);

// eslint-disable-next-line no-shadow
function productOfArray(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr.at(-1);

  return arr.at(-1) * productOfArray(arr.slice(0, -1));
}

console.log(`product of [0]: ${productOfArray([])}`);
console.log(`product of [1, 2, 3]: ${productOfArray([1, 2, 3])}`);
console.log(`product of [1, 2, 3, 10]: ${productOfArray([1, 2, 3, 10])}`);

const nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
          },
        },
      },
    },
  },
};

function contains(obj, item) {
  // console.log(Object.values(obj));

  for (const [key, value] of Object.entries(obj)) {
    // console.log("key:", key, "value:", value);
    // console.log("item:", item);
    if (value === item) {
      // console.log("FOUND! at:", key);
      return { key, value };
    }

    if (typeof value === "object") {
      return contains(value, item);
    }
  }
  return `didn't find "${item}" :(`;

  // Object.entries(obj).forEach((entry) => {
  //   console.log(entry);
  // });
}

const hasIt = contains(nestedObject, 44); // true
const doesntHaveIt = contains(nestedObject, "foo"); // false

console.log("hasIt:", hasIt);
console.log("doesntHaveIt:", doesntHaveIt);

const multiArray = [[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]];

// eslint-disable-next-line no-shadow
function totalIntegers(arr) {
  let total = 0;
  for (const item of arr) {
    // console.log("type:", typeof item, "item:", item);
    if (typeof item === "number") {
      total += 1;
    }

    if (typeof item === "object") {
      total += totalIntegers(item);
    }
  }

  return total;
  // arr.forEach((item) => {
  //   if (typeof item === "number") {
  //     return item;
  //   }

  //   return item;
  //   // console.log(typeof item);
  // });
}
const seven = totalIntegers(multiArray);

console.log("number of integers in multi-dimentional array:", seven);

const list1 = [1, 2, 3];
const list2 = [[1, 2], 3];
const list3 = [[[[[[[[[1]]]]]]]]];
const list4 = [10, [[10], 10], [10]];

// eslint-disable-next-line no-shadow
function sumSquares(list) {
  let total = 0;
  for (const item of list) {
    // console.log("type:", typeof item, "item:", item);
    if (typeof item === "number") {
      total += item * item;
    }

    if (typeof item === "object") {
      total += sumSquares(item);
    }
  }

  return total;
}

console.log(`sum of squares: ${list1}:`, sumSquares(list1));
console.log(`sum of squares: ${list2}:`, sumSquares(list2));
console.log(`sum of squares: ${list3}:`, sumSquares(list3));
console.log(`sum of squares: ${list4}:`, sumSquares(list4));

// eslint-disable-next-line no-shadow
function replicate(n, item) {
  if (n <= 0) {
    return [];
  }

  const replicateResult = replicate(n - 1, item);
  replicateResult.push(item);
  return replicateResult;
}

console.log(`replicate (3, 5): ${JSON.stringify(replicate(3, 5))}`);
console.log(`replicate (1, 24): ${JSON.stringify(replicate(1, 24))}`);
console.log(`replicate (-2, 6): ${JSON.stringify(replicate(-2, 6))}`);
