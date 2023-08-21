import { render, screen } from "@testing-library/react";
import { Shop } from "./Shop";
import { BrowserRouter } from "react-router-dom";

it("renders Shop component", async () => {
  render(<Shop />, { wrapper: BrowserRouter });
  expect(screen.getByRole("heading", { name: "Category" })).toBeVisible();
});
