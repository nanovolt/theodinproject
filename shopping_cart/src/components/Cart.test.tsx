import { render, screen } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import { BrowserRouter } from "react-router-dom";
import { CartType } from "../types/types";
import { Cart } from "./Cart";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

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

const initialState: CartType = {
  grandTotal: 291,
  itemsAmount: 2,
  items: [item1, item2],
};

const emptyCart: CartType = {
  grandTotal: 0,
  itemsAmount: 0,
  items: [],
};

it("renders empty cart", () => {
  render(
    <CartProvider initialState={emptyCart}>
      <Cart />
    </CartProvider>,
    {
      wrapper: BrowserRouter,
    }
  );

  expect(screen.getByRole("heading", { name: "Cart is empty" })).toBeVisible();
  expect(screen.getByRole("link", { name: "To shop" })).toBeVisible();
});

it("renders full cart", () => {
  render(
    <CartProvider initialState={initialState}>
      <Cart />
    </CartProvider>,
    {
      wrapper: BrowserRouter,
    }
  );

  expect(screen.getByRole("heading", { name: "Cart" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Payment" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Purchase" })).toBeVisible();
  expect(screen.getByRole("generic", { name: `Grand total is $291` })).toBeVisible();
});

it("makes a purchase and clears the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider initialState={initialState}>
      <Cart />
    </CartProvider>,
    {
      wrapper: BrowserRouter,
    }
  );
  const purchaseButton = screen.getByRole("button", { name: "Purchase" });

  expect(screen.getByRole("heading", { name: "Cart" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Payment" })).toBeVisible();
  expect(purchaseButton).toBeVisible();
  expect(screen.getByRole("generic", { name: `Grand total is $291` })).toBeVisible();

  await act(async () => {
    await user.click(purchaseButton);
  });

  expect(screen.getByRole("heading", { name: "Cart is empty" })).toBeVisible();
  expect(screen.getByRole("link", { name: "To shop" })).toBeVisible();
});
