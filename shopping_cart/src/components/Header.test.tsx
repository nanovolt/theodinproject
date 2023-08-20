import { render } from "@testing-library/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";

it("renders header", () => {
  render(<Header />, { wrapper: BrowserRouter });
});
