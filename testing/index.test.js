import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from ".";

test("capitalize the first letter", () => {
  expect(capitalize("jest")).toBe("Jest");
});

test("reverse the string", () => {
  expect(reverseString("jest")).toBe("tsej");
});

test("calculator adds 5 and 5 equals 8", () => {
  expect(calculator.add(5, 3)).toBe(8);
});

test("calculator subtract 3 from 5 equals 2", () => {
  expect(calculator.subtract(5, 3)).toBe(2);
});

test("calculator multiplies 5 and 3 equals 15", () => {
  expect(calculator.multiply(5, 3)).toBe(15);
});

test("calculator divides 5 and 3 is close to 1.67", () => {
  expect(calculator.divide(5, 3)).toBeCloseTo(1.67);
});

test("get ceasar cipher with shift 3", () => {
  const string = "hEllO";
  const shift = 3;
  expect(caesarCipher(string, shift)).toBe("kHooR");
});

test("analyzes an array gives object with avg, min, max, length", () => {
  const arr = [2, 8, 3, 4, 1, 6];
  expect(analyzeArray(arr)).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
