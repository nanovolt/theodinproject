import { render, screen, waitFor } from "@testing-library/react";
import { Products } from "./Products";
import { ProductsProvider } from "../context/ProductsContext";
import { useFetch } from "../hooks/useFetch";
import { productsMock } from "../context/ProductsMock";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// jest.mock("react-router-dom", () => ({
//   // __esModule: true,
//   ...jest.requireActual("react-router-dom"),
//   useParams: () => ({ category: "all" }),
// }));

jest.mock("../hooks/useFetch");
const mockedUseFetch = jest.mocked(useFetch);

it(`loading products`, async () => {
  mockedUseFetch.mockReturnValue({
    data: null,
    isLoading: true,
    isError: false,
    errorMessage: "",
  });

  render(
    <MemoryRouter initialEntries={["/shop/all"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop/:category" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );
  expect(screen.getByTitle("Spinning fan")).toBeInTheDocument();
  expect(screen.getByRole("generic", { name: "fan" })).toBeVisible();
});

it(`shows "All" category`, async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  render(
    <MemoryRouter initialEntries={["/shop/all"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop/:category" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "All" })).toBeVisible();
  });
});

it(`shows "Mens'c clothing" category`, async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  render(
    <MemoryRouter initialEntries={["/shop/men's-clothing"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop/:category" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Men's clothing" })).toBeVisible();
  });
});

it(`shows error`, async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: true,
    errorMessage: "this is an error!",
  });

  render(
    <MemoryRouter initialEntries={["/shop/men's-clothing"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop/:category" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("Something went wrong: Error: this is an error!")).toBeVisible();
});

it(`shows no category heading if no params given`, async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "no category" })).toBeVisible();
});

it(`shows 404 error if data is null or undefined`, async () => {
  mockedUseFetch.mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  render(
    <MemoryRouter initialEntries={["/shop/123"]}>
      <ProductsProvider>
        <Routes>
          <Route path="/shop/:category" element={<Products />} />
        </Routes>
      </ProductsProvider>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "Error 404: 123 not found" })).toBeVisible();
});
