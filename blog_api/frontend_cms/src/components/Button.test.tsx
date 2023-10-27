import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

it("renders button", () => {
  render(<Button>hi</Button>);
  expect(screen.getByRole("button", { name: "hi" })).toBeVisible();
});
