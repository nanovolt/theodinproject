import { createContext, useContext, useReducer } from "react";
import { CartType, CartItemType, CartAction } from "../types/types";

const defaultCart: CartType = {
  items: [],
  itemsAmount: 0,
  grandTotal: 0,
};

const CartContext = createContext<CartType>(defaultCart);

const CartDispatchContext = createContext<React.Dispatch<CartAction>>(() => "some default return");

type Props = {
  children: React.ReactNode;
  initialState?: CartType;
};

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

export function CartProvider({ children, initialState = defaultCart }: Props) {
  // const init: Cart = { items: [], itemsAmount: 0, grandTotal: 0 };
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchCart}>{children}</CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

function cartReducer(state: CartType, action: CartAction): CartType {
  switch (action.type) {
    case "added_item": {
      const found = state.items.find((i) => i.id === action.product!.id);

      if (found) {
        const newItems = state.items.map((i) => {
          if (i.id === action.product!.id) {
            const newItemTotal = Math.round((i.total + i.price + Number.EPSILON) * 100) / 100;
            // causes updates twice with strict mode if return i.amount + 1;
            return { ...i, amount: i.amount + 1, total: newItemTotal };
          }
          return i;
        });

        const newTotal =
          Math.round((state.grandTotal + action.product!.price + Number.EPSILON) * 100) / 100;

        return {
          ...state,
          items: newItems,
          grandTotal: newTotal,
        };
      } else {
        const newTotal =
          Math.round((state.grandTotal + action.product!.price + Number.EPSILON) * 100) / 100;

        const newItem = {
          ...action.product!,
          amount: 1,
          total: action.product!.price,
        };

        return {
          ...state,
          itemsAmount: state.itemsAmount + 1,
          grandTotal: newTotal,
          items: [...state.items, newItem],
        };
      }
    }

    case "removed_item": {
      const found = state.items.find((i) => i.id === action.product!.id) as CartItemType;

      if (found.amount === 1) {
        return state;
      }

      const newItems = state.items.map((i) => {
        if (i.id === action.product!.id) {
          // if (i.amount === 1) {
          //   return i;
          // }

          const t = Math.round((i.total - i.price + Number.EPSILON) * 100) / 100;

          return { ...i, amount: i.amount - 1, total: t };
        }
        return i;
      });

      const newTotal =
        Math.round((state.grandTotal - action.product!.price + Number.EPSILON) * 100) / 100;

      return {
        ...state,
        items: newItems,
        grandTotal: newTotal,
      };
    }

    case "deleted_item": {
      const found = state.items.find((i) => i.id === action.product!.id) as CartItemType;

      const newItems = state.items.filter((i) => i.id !== action.product!.id);

      const newTotal =
        Math.round(
          (state.grandTotal - action.product!.price * found.amount + Number.EPSILON) * 100
        ) / 100;

      return {
        ...state,
        grandTotal: newTotal,
        itemsAmount: state.itemsAmount - 1,
        items: newItems,
      };
    }

    case "cleared_cart": {
      return {
        items: [],
        itemsAmount: 0,
        grandTotal: 0,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
