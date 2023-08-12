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

export type CartContextType = {
  cartItems: CartItemType[];
  currentAmount: number;
  grandTotal: number;
  addCartItem: (item: Product) => void;
  removeCartItem: (item: Product) => void;
  deleteCartItem: (item: CartItemType) => void;
  clearCart: () => void;
};
