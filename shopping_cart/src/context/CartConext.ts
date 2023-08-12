import { createContext } from "react";
import { CartContextType, CartItemType, Product } from "../types/types";

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  currentAmount: 0,
  grandTotal: 0,
  addCartItem: (item: Product) => {},
  removeCartItem: (item: Product) => {},
  deleteCartItem: (item: CartItemType) => {},
  clearCart: () => {},
});
