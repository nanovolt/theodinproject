import { render, screen } from "@testing-library/react";
import { CartItem } from "./CartItem";
import { CartProvider } from "../context/CartContext";
import { Cart } from "../types/types";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const item1 = {
  id: 1,
  image: "test image",
  price: 42,
  title: "test title",
  amount: 2,
  total: 84,
};

const item2 = {
  id: 2,
  image: "test image 2",
  price: 69,
  title: "test title 2",
  amount: 3,
  total: 207,
};

const initialState: Cart = {
  grandTotal: 291,
  itemsAmount: 2,
  items: [item1, item2],
};

it("added item", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider initialState={initialState}>
      <CartItem item={item1} />
    </CartProvider>
  );

  expect(screen.getByRole("generic", { name: "Total" })).toHaveTextContent("Total $84");

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "+" }));
  });

  expect(screen.getByRole("generic", { name: "Total" })).toHaveTextContent("Total $126");
});

it("removed item", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider initialState={initialState}>
      <CartItem item={item1} />
    </CartProvider>
  );

  expect(screen.getByRole("generic", { name: "Total" })).toHaveTextContent("Total $84");

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "-" }));
  });

  expect(screen.getByRole("generic", { name: "Total" })).toHaveTextContent("Total $42");
});

it("deleted item", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider initialState={initialState}>
      <CartItem item={item1} />
    </CartProvider>
  );

  expect(screen.getByRole("generic", { name: "Total" })).toHaveTextContent("Total $84");

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Delete X" }));
  });

  expect(screen.getByText(`cart item id:${item1.id} not found`)).toBeVisible();
});
