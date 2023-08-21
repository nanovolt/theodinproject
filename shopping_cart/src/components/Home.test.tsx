import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { BrowserRouter } from "react-router-dom";

it("renders Home component", () => {
  render(<Home />, { wrapper: BrowserRouter });

  expect(screen.getByText("Style & fashion")).toBeVisible();
  expect(screen.getByRole("link", { name: "Shop now" })).toBeVisible();
});
