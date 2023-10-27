import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

it("renders the author", () => {
  render(<Footer />);
  expect(screen.getByRole("generic", { name: "made by nanovolt" })).toBeVisible();
});
