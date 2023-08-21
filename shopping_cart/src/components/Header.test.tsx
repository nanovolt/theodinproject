import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";

it("renders header", () => {
  render(<Header />, { wrapper: BrowserRouter });

  expect(screen.getByRole("link", { name: "Home" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Shop" })).toBeVisible();
  expect(screen.getByRole("link", { name: "About" })).toBeVisible();
});
