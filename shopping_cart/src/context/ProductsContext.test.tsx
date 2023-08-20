import { render, waitFor } from "@testing-library/react";
import { ProductsProvider, getAllByCategory, useProducts } from "./ProductsContext";
import { Products } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import { productsMock } from "./ProductsMock";

jest.mock("../hooks/useFetch");

const mockedUseFetch = jest.mocked(useFetch);

it("successfully gets data", async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  const desiredProducts = {
    all: productsMock,
    "men's clothing": getAllByCategory("men's clothing", productsMock),
    "women's clothing": getAllByCategory("women's clothing", productsMock),
    jewelery: getAllByCategory("jewelery", productsMock),
    electronics: getAllByCategory("electronics", productsMock),
  };

  let state: Products;

  const Test = () => {
    const { products } = useProducts();
    state = products;
    return <></>;
  };

  render(
    <ProductsProvider>
      <Test />
    </ProductsProvider>
  );

  await waitFor(() => {
    expect(state).toEqual(desiredProducts);
  });
});

it("gets empty data", async () => {
  mockedUseFetch.mockReturnValue({
    data: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  let state: Products;

  const Test = () => {
    const { products } = useProducts();
    state = products;
    return <></>;
  };

  render(
    <ProductsProvider>
      <Test />
    </ProductsProvider>
  );

  await waitFor(() => {
    expect(state).toEqual([]);
  });
});
