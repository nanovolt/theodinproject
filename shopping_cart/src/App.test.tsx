import { render, screen } from "@testing-library/react";
import App from "./App";
// import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDarkMode } from "./hooks/useDarkMode";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Link, Route, Routes, useLocation } from "react-router-dom";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";

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

// jest.mock("./hooks/useLocalStorage", () => ({
//   useLocalStorage: jest.fn(),
// }));

jest.mock("./hooks/useDarkMode", () => ({
  useDarkMode: jest.fn(),
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

// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: (query: any) => ({
//     matches: true,
//   }),
// });

beforeEach(() => {
  (useDarkMode as jest.Mock).mockName("useDarkMode");
  // (useLocalStorage as jest.Mock).mockReturnValue([
  //   "dark",
  //   (cb: (mode: "dark" | "light") => string) => cb("dark"),
  // ]);

  (useDarkMode as jest.Mock).mockReturnValue(["dark", jest.fn()]);
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

it("renders shopping cart heading", () => {
  // render(<RouterProvider router={router} />);
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Home/i);
  expect(heading).toBeInTheDocument();
});

it(`calls useDarkMode hook`, () => {
  // render(<App />);
  // render(<RouterProvider router={router} />);
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(useDarkMode).toHaveBeenCalledTimes(1);
});

it("sets dark mode on app component", () => {
  // render(<App />);
  // render(<RouterProvider router={router} />);
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByTestId("app")).toHaveAttribute(
    "data-color-scheme",
    "dark"
  );
});

it("toggles light mode on click", () => {
  const mockSetMode = jest.fn((arg) => {}).mockName("mockSetMode");
  (useDarkMode as jest.Mock).mockReturnValue(["dark", mockSetMode]);

  // render(<App />);
  // render(<RouterProvider router={router} />);
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  userEvent.click(screen.getByText(/toggle dark mode/));
  expect(mockSetMode).toHaveBeenCalledWith("light");
});

it("toggles dark mode on click", () => {
  const mockSetMode = jest.fn((arg) => {}).mockName("mockSetMode");
  (useDarkMode as jest.Mock).mockReturnValue(["light", mockSetMode]);

  // render(<App />);
  // render(<RouterProvider router={router} />);
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  userEvent.click(screen.getByText(/toggle dark mode/));
  expect(mockSetMode).toHaveBeenCalledWith("dark");
});
