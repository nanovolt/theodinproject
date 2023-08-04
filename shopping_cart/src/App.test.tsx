import { render, screen } from "@testing-library/react";
import App from "./App";
import { useLocalStorage } from "./hooks/useLocalStorage";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// jest.mock("./hooks/useLocalStorage", () => () => ["mock value", () => {}]);

// jest.mock("./hooks/useLocalStorage", () => {
//   // const originalModule = jest.requireActual("./hooks/useLocalStorage");

//   //Mock the default export and named export 'useLocalStorage'
//   return {
//     // __esModule: true,
//     // ...originalModule,
//     // or like this: ...jest.requireActual("./hooks/useLocalStorage"),
//     // default: jest.fn(() => "mocked baz"),
//     useLocalStorage: () => ["mock value", () => {}],
//   };
// });

jest.mock("./hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

// https://github.com/facebook/create-react-app/issues/10126

// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: true,
  }),
});

beforeEach(() => {
  (useLocalStorage as jest.Mock).mockName("useLocalStorage");
  (useLocalStorage as jest.Mock).mockReturnValue([
    "dark",
    (cb: (mode: "dark" | "light") => string) => cb("dark"),
  ]);
});

it("renders shopping cart heading", () => {
  render(<App />);
  const heading = screen.getByText(/Shopping cart/i);
  expect(heading).toBeInTheDocument();
});

it("calls useLocalStorage hook", () => {
  render(<App />);
  expect(useLocalStorage).toHaveBeenCalledTimes(1);
});

it(`calls useLocalStorage hook with "dark" colorScheme argument`, () => {
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

  render(<App />);
  expect(useLocalStorage).toHaveBeenCalledWith("dark", "colorScheme");
});

it(`calls useLocalStorage hook with "light" colorScheme argument`, () => {
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

  render(<App />);
  expect(useLocalStorage).toHaveBeenCalledWith("light", "colorScheme");
});

it("sets dark mode on app component", () => {
  render(<App />);

  userEvent.click(screen.getByText(/toggle dark mode/));
  expect(screen.getByTestId("app")).toHaveAttribute(
    "data-color-scheme",
    "dark"
  );
});

it("sets light mode on app component", () => {
  (useLocalStorage as jest.Mock).mockReturnValue([
    "light",
    (cb: (mode: "dark" | "light") => string) => cb("light"),
  ]);

  render(<App />);

  userEvent.click(screen.getByText(/toggle dark mode/));

  expect(screen.getByTestId("app")).toHaveAttribute(
    "data-color-scheme",
    "light"
  );
});
