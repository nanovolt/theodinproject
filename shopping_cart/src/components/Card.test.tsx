import { render, screen, waitFor } from "@testing-library/react";
import { Card } from "./Card";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartConext";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const product = {
  id: 5,
  title: "title test",
  price: 42,
  image: "image url test",
};

it("renders the card when a product is not added to the cart yet", () => {
  render(
    <CartProvider>
      <Card product={product} />
    </CartProvider>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByText("title test")).toBeVisible();
  expect(screen.getByRole("generic", { name: "Price: $42" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Add to cart" })).toBeVisible();
});

it("adds a product to the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <Card product={product} />
    </CartProvider>,
    { wrapper: BrowserRouter }
  );

  const addButton = screen.getByRole("button", { name: "Add to cart" });

  await act(async () => {
    await user.click(addButton);
  });

  await waitFor(() => {
    expect(screen.getByRole("generic", { name: "In the cart: 1" })).toBeVisible();
  });

  expect(screen.queryByRole("button", { name: "Add to cart" })).toBeFalsy();
  expect(screen.getByRole("button", { name: "-" })).toBeVisible();
  expect(screen.getByRole("button", { name: "+" })).toBeVisible();
  expect(screen.getByRole("link", { name: "To cart" })).toBeVisible();

  await act(async () => {
    await user.click(addButton);
    await user.click(addButton);
  });

  expect(screen.getByRole("generic", { name: "In the cart: 3" })).toBeVisible();
});

it("removes a product from the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <Card product={product} />
    </CartProvider>,
    { wrapper: BrowserRouter }
  );

  const addButton = screen.getByRole("button", { name: "Add to cart" });

  await act(async () => {
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);
  });

  await waitFor(() => {
    expect(screen.getByRole("generic", { name: "In the cart: 3" })).toBeVisible();
  });

  const removeButton = screen.getByRole("button", { name: "-" });

  await act(async () => {
    await user.click(removeButton);
    await user.click(removeButton);
  });

  expect(screen.getByRole("generic", { name: "In the cart: 1" })).toBeVisible();
});

it(`disables "-" button if there is 1 item in the cart`, async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <Card product={product} />
    </CartProvider>,
    { wrapper: BrowserRouter }
  );

  const addButton = screen.getByRole("button", { name: "Add to cart" });

  await act(async () => {
    await user.click(addButton);
  });

  const removeButton = screen.getByRole("button", { name: "-" });

  await waitFor(() => {
    expect(removeButton).toBeDisabled();
  });
});

it(`disables "+" button if there are 10 items in the cart`, async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <Card product={product} />
    </CartProvider>,
    { wrapper: BrowserRouter }
  );

  const addButton = screen.getByRole("button", { name: "Add to cart" });

  await act(async () => {
    for (let i = 0; i < 10; i++) {
      await user.click(addButton);
    }
  });

  const addMoreButton = screen.getByRole("button", { name: "+" });

  await waitFor(() => {
    expect(addMoreButton).toBeDisabled();
  });
});
