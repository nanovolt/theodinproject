import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { CartContext } from "../context/CartConext";
import { BrowserRouter } from "react-router-dom";

const product = {
  id: 5,
  title: "title test",
  price: 42,
  image: "image url test",
  amount: 2,
  total: 84,
};

it("renders the card with product not added to cart", () => {
  const contextValue = {
    cartItems: [],
    currentAmount: 0,
    grandTotal: 0,
    addCartItem: () => {},
    removeCartItem: () => {},
    deleteCartItem: () => {},
    clearCart: () => {},
  };

  render(
    <CartContext.Provider value={contextValue}>
      <Card
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    </CartContext.Provider>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByText("title test")).toBeInTheDocument();
  expect(screen.getByText("Add to cart")).toBeInTheDocument();
});

it("renders the card with product added to cart", () => {
  const contextValue = {
    cartItems: [product],
    currentAmount: 0,
    grandTotal: 0,
    addCartItem: () => {},
    removeCartItem: () => {},
    deleteCartItem: () => {},
    clearCart: () => {},
  };

  render(
    <CartContext.Provider value={contextValue}>
      <Card
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    </CartContext.Provider>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByText("title test")).toBeInTheDocument();
  expect(screen.getByText("$ 42")).toBeInTheDocument();
  expect(screen.getByText("-")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("+")).toBeInTheDocument();
});
