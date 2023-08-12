import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

const product = {
  id: 0,
  title: "title test",
  price: 42,
  image: "image test",
};

it("render card", () => {
  render(
    <Card
      id={product.id}
      title={product.title}
      price={product.price}
      image={product.image}
    />
  );
});
