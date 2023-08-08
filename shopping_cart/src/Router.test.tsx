import { render } from "@testing-library/react";
import { Router } from "./Router";

it("lauches router", () => {
  const { container } = render(<Router />);

  // console.log(container);
  expect(container).toBeInTheDocument();
});
