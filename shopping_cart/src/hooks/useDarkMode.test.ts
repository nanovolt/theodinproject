import { useDarkMode } from "./useDarkMode";
import { renderHook } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// Object.defineProperty(window, "localStorage", {
//   value: (query: any) => ({
//     getItem: () => "dark",
//   }),
// });

it(`sets state to "dark" if storage returns "dark"`, () => {
  Storage.prototype.getItem = () => "dark";
  const { result } = renderHook(useDarkMode);
  const [value, setValue] = result.current;
  // console.log(result.current);
  expect(value).toBe("dark");
});

it(`sets state to "light" if storage returns "light"`, () => {
  Storage.prototype.getItem = () => "light";
  const { result } = renderHook(useDarkMode);
  const [value, setValue] = result.current;
  // console.log(result.current);
  expect(value).toBe("light");
});

it(`sets state to "dark" if prefer-color-scheme matches dark"`, () => {
  Storage.prototype.getItem = () => null;

  const { result } = renderHook(useDarkMode);
  const [value, setValue] = result.current;
  // console.log(result.current);
  expect(value).toBe("dark");
});

it(`sets state to "light" if prefer-color-scheme doesn't match "dark"`, () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
  Storage.prototype.getItem = () => null;

  const { result } = renderHook(useDarkMode);
  const [value, setValue] = result.current;
  // console.log(result.current);
  expect(value).toBe("light");
});

it(`triggers change event"`, () => {
  let eventHandler = jest.fn().mockName("event handler");

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated

      addEventListener: eventHandler,

      // addEventListener: jest.fn((arg, cb) => {
      //   // eventHandler();
      //   // eventHandler.mockImplementation(cb)();
      //   cb();
      // }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
  Storage.prototype.getItem = () => null;

  // (window.addEventListener as jest.Mock).mockImplementation((type, cb) => cb());
  // (window.addEventListener as jest.Mock)
  //   .mockImplementation(() => {})
  //   .mockName("event listener");

  const { result } = renderHook(useDarkMode);

  const [value, setValue] = result.current;

  const a = jest.fn((arg) => {});
  eventHandler.mockImplementation((arg) => {
    a(arg);
  });
  // const spy = jest.spyOn(a, "setValue");

  // console.log(result.current);
  expect(a).toHaveBeenCalledWith("");
});
