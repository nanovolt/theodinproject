import { render, screen } from "@testing-library/react";
import { CategoryList } from "./CategoryList";
import { MemoryRouter } from "react-router-dom";

const list = [
  { id: 1, category: "All", to: "all" },
  { id: 2, category: "Men's clothing", to: "men's-clothing" },
  { id: 3, category: "Women's clothing", to: "women's-clothing" },
  { id: 4, category: "Jewelery", to: "jewelery" },
  { id: 5, category: "Electronics", to: "electronics" },
];

it("link has active class with corresponing matching path", () => {
  render(
    <MemoryRouter initialEntries={["/all"]}>
      <CategoryList list={list} />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: "All" })).toHaveClass("active");
});

it("another link has active class with corresponing matching path, diactivates first link", () => {
  render(
    <MemoryRouter initialEntries={["/men's-clothing"]}>
      <CategoryList list={list} />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: "All" })).not.toHaveClass("active");
  expect(screen.getByRole("link", { name: "Men's clothing" })).toHaveClass("active");
});
