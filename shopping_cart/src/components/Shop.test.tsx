import { render, screen, waitFor } from "@testing-library/react";
import { Shop } from "./Shop";
import { BrowserRouter } from "react-router-dom";

it("renders Shop component", async () => {
  render(<Shop />, { wrapper: BrowserRouter });

  expect(screen.getByTitle("Spinning fan")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
