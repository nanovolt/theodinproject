import { render, screen } from "@testing-library/react";
import { About } from "./About";

it("renders About component", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "About us" })).toBeVisible();
});
