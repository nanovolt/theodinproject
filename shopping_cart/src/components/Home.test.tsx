import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

it("renders Home component", () => {
  render(<Home />);
  expect(screen.getByText("Shopping cart")).toBeInTheDocument();
});
