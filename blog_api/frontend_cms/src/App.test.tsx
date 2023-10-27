import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { DarkModeProvider } from "./context/DarkModeContext";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: true,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }),
});

it.only("sets dark mode on app component", () => {
  render(
    <DarkModeProvider>
      <App />
    </DarkModeProvider>,
    { wrapper: BrowserRouter }
  );
  expect(screen.getByTestId("app")).toHaveAttribute("data-color-scheme", "dark");
});

it.only("toggles dark mode", async () => {
  const user = userEvent.setup();

  render(
    <DarkModeProvider>
      <App />
    </DarkModeProvider>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByTestId("app")).toHaveAttribute("data-color-scheme", "dark");

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Dark mode toggle switch" }));
  });

  await waitFor(() => {
    expect(screen.getByTestId("app")).toHaveAttribute("data-color-scheme", "light");
  });
});
