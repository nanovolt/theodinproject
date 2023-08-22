import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Error } from "./Error";

it("renders 404 page", () => {
  const consoleErrorSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

  const routes = [
    {
      path: "/",
      element: <h1>Element H1 heading</h1>,
      errorElement: <Error />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/something"],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByRole("heading", { name: "404" })).toBeVisible();
  expect(screen.getByRole("link", { name: "To home" })).toBeVisible();

  consoleErrorSpy.mockRestore();
});
