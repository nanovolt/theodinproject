type Rating = {
  count: number;
  rate: number;
};

export type FetchedProduct = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type CartItemType = Product & {
  amount: number;
  total: number;
};

export type Cart = {
  items: CartItemType[];
  itemsAmount: number;
  grandTotal: number;
};

// export type CartDispatch = {
//   addCartItem: (item: Product) => void;
//   removeCartItem: (item: Product) => void;
//   deleteCartItem: (item: CartItemType) => void;
//   clearCart: () => void;
// };

export type CartAction = {
  type: "added_item" | "removed_item" | "deleted_item" | "cleared_cart";
  // type: string;
  product?: Product;
};

export type DarkModeAction = {
  type: "toggle" | "setTo";
  mode?: "dark" | "light";
};

export type DarkMode = "dark" | "light";
export type DarkModeDispatch = React.Dispatch<DarkModeAction>;

export type Products = Record<string, Product[]> | [];

export type ProductsContextType = {
  products: Products;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
