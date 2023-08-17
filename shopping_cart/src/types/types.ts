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
  type: string;
  mode: "dark" | "light";
};
