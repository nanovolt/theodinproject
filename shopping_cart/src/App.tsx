import styles from "./App.module.scss";
import classNames from "classnames";

import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useDarkMode } from "./hooks/useDarkMode";
import { Footer } from "./components/Footer";
import { useState } from "react";
// import { useFetch } from "./hooks/useFetch";
import { CartItemType, CartContextType, Product } from "./types/types";
// import { CartContext } from "./context/CartContext";
import { createContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";

// export const CartContext = createContext({
//   cartItems:  [],
//   currentAmount: 0,
//   add: (product: Product) => {},
// });

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  currentAmount: 0,
  grandTotal: 0,
  addCartItem: (item: Product) => {},
  removeCartItem: (item: Product) => {},
  deleteCartItem: (item: CartItemType) => {},
  clearCart: () => {},
});

// const CartContext = createContext({
//   cartItems: [],
//   addToCart: () => {},
// });

function App() {
  // const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const { data, isLoading, isError, errorMessage } = useFetch("")

  // const response = useFetch("https://fakestoreapi.com/products");
  // console.log(response);
  const [mode, setMode] = useDarkMode();
  // const [colorScheme, setColorScheme] = useLocalStorage(
  //   defaultDark ? "dark" : "light",
  //   "colorScheme"
  // );

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  // console.log("cartItems:", cartItems);

  const [currentAmount, setCurrentAmount] = useState(0);
  const [grandTotal, setTotal] = useState(0);

  function handleDarkModeToggle() {
    // setColorScheme((prev: "dark" | "light") =>
    //   prev === "dark" ? "light" : "dark"
    // );

    setMode(mode === "light" ? "dark" : "light");
  }

  function removeCartItem(item: Product) {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          // const a = i.amount + 1;

          // console.log("remove");

          if (i.amount === 1) {
            // console.log("return");
            return i;
          }

          const t =
            Math.round((i.total - i.price + Number.EPSILON) * 100) / 100;

          return { ...i, amount: i.amount - 1, total: t };
          // return { ...i, amount: i.amount + 1 };
        }
        return i;
      })
    );

    setTotal((prev) => {
      const grand =
        Math.round((prev - item.price + Number.EPSILON) * 100) / 100;
      return grand;
    });
  }

  function deleteCartItem(item: CartItemType) {
    // console.log("delete:", item.id);

    setTotal((prev) => {
      const grand =
        Math.round((prev - item.price * item.amount + Number.EPSILON) * 100) /
        100;
      return grand;
    });
    setCurrentAmount((prev) => prev - 1);
    setCartItems(cartItems.filter((i) => i.id !== item.id));
  }

  function addCartItem(item: Product) {
    const found = cartItems.find((i) => i.id === item.id);

    if (found) {
      // console.log("found: id:", found.id, "amount:", found.amount);

      setCartItems((prev) =>
        prev.map((i) => {
          if (i.id === found.id) {
            // const a = i.amount + 1;
            // console.log("i++");

            const t =
              Math.round((i.total + i.price + Number.EPSILON) * 100) / 100;
            // causes updates twice with strict mode if return i.amount + 1;
            return { ...i, amount: i.amount + 1, total: t };
          }
          return i;
        })
      );

      setTotal((prev) => {
        console.log("prev:", prev);
        console.log("i.price:", item.price);

        const grand =
          Math.round((prev + item.price + Number.EPSILON) * 100) / 100;
        return grand;
      });
    } else {
      console.log("pushing...");
      setCurrentAmount((prev) => prev + 1);

      setTotal((prev) => {
        const grand =
          Math.round((prev + item.price + Number.EPSILON) * 100) / 100;
        return grand;
      });
      setCartItems((prev) => [
        ...prev,
        { ...item, amount: 1, total: item.price },
      ]);
    }
  }

  function clearCart() {
    setCartItems([]);
    setTotal(0);
    setCurrentAmount(0);
  }
  // function onChange(e: any) {
  //   setN((prev) => Number(e.target.value));
  // }

  // function add() {
  //   setCurrentAmount((prev) => prev + 1);
  // }

  const appClasses = classNames(styles.App, {});

  // const CC = { cartItems, currentAmount, addCartItem, removeCartItem };

  return (
    <DarkModeContext.Provider value={{ mode }}>
      <CartContext.Provider
        value={{
          cartItems,
          currentAmount,
          addCartItem,
          removeCartItem,
          grandTotal,
          deleteCartItem,
          clearCart,
        }}>
        <div className={appClasses} data-color-scheme={mode} data-testid="app">
          <Header handleDarkModeToggle={handleDarkModeToggle} />

          {/* <input type="number" name="" id="" onChange={onChange} /> */}

          {/* <button onClick={add}>global add</button> */}
          {/* <div>n: {n}</div> */}
          <main>
            <Outlet
            // context={
            //   { currentAmount, addCartItem } satisfies AddCartItemContextType
            // }
            />
          </main>
          <Footer />
        </div>
      </CartContext.Provider>
    </DarkModeContext.Provider>
  );
}

// export function useAddCartItem() {
//   return useOutletContext<AddCartItemContextType>();
// }

export default App;
