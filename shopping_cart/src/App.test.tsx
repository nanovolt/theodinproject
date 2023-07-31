import { render, screen } from "@testing-library/react";
import App from "./App";

//github.com/facebook/create-react-app/issues/10126

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
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

test("renders shopping cart", () => {
  render(<App />);
  const heading = screen.getByText(/Shopping cart/i);
  expect(heading).toBeInTheDocument();
});
