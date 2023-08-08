import { render, screen } from "@testing-library/react";
import { Shop } from "./Shop";

it("renders Shop component", () => {
  render(<Shop />);
  expect(screen.getByText("Shop")).toBeInTheDocument();
});
