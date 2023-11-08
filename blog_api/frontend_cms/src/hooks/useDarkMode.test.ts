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

it(`sets state to "dark" if storage returns "dark"`, () => {
  Storage.prototype.getItem = () => "dark";
  const { result } = renderHook(useDarkMode);
  const [value] = result.current;
  expect(value).toBe("dark");
});

it(`sets state to "light" if storage returns "light"`, () => {
  Storage.prototype.getItem = () => "light";
  const { result } = renderHook(useDarkMode);
  const [value] = result.current;
  expect(value).toBe("light");
});

it(`sets state to "dark" if prefer-color-scheme matches dark"`, () => {
  Storage.prototype.getItem = () => null;

  const { result } = renderHook(useDarkMode);
  const [value] = result.current;
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
  const [value] = result.current;
  expect(value).toBe("light");
});

it(`triggers change event if matches and sets dark mode`, () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated

      addEventListener: jest.fn((_arg, cb) => {
        cb();
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });

  Storage.prototype.getItem = () => null;

  const { result } = renderHook(useDarkMode);
  const [value] = result.current;
  expect(value).toBe("dark");
});

it(`triggers change event if not matches and sets light mode`, () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated

      addEventListener: jest.fn((_arg, cb) => {
        cb();
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });

  Storage.prototype.getItem = () => null;

  const { result } = renderHook(useDarkMode);
  const [value] = result.current;
  expect(value).toBe("light");
});
