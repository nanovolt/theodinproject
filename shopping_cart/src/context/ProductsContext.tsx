import { createContext, useContext } from "react";
import { FetchedProduct, Product, Products, ProductsContextType } from "../types/types";
import { useFetch } from "../hooks/useFetch";

// type Category = "all" | "men's clothing" | "women's clothing" | "jewelery" | "electronics";

const defaultProducts: Product[] = [];

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
});

export function useProducts() {
  return useContext(ProductsContext);
}

type Props = {
  children: React.ReactNode;
  initialState?: Product[];
};

export function getAllByCategory(category: string, arr: FetchedProduct[]) {
  return arr
    .filter((item) => item.category === category)
    .map((p) => ({ id: p.id, title: p.title, price: p.price, image: p.image }));
}

export function ProductsProvider({ children, initialState = defaultProducts }: Props) {
  const { data, isLoading, isError, errorMessage } = useFetch<FetchedProduct[]>(
    "https://fakestoreapi.com/products"
  );

  let products: Products = [];
  if (data) {
    products = {
      all: data,
      "men's clothing": getAllByCategory("men's clothing", data),
      "women's clothing": getAllByCategory("women's clothing", data),
      jewelery: getAllByCategory("jewelery", data),
      electronics: getAllByCategory("electronics", data),
    };
  }

  return (
    <ProductsContext.Provider value={{ products, isLoading, isError, errorMessage }}>
      {children}
    </ProductsContext.Provider>
  );
}
