import { Outlet, useOutletContext } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/Header";
import { useDarkMode } from "./hooks/useDarkMode";
import classNames from "classnames";
import { Footer } from "./components/Footer";
import { useState } from "react";
// import { useFetch } from "./hooks/useFetch";s

type ContextType = { cartNumber: number };

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

  const [cartNumber, setCartNumber] = useState(0);

  function handleDarkModeToggle() {
    // setColorScheme((prev: "dark" | "light") =>
    //   prev === "dark" ? "light" : "dark"
    // );

    setCartNumber((prev) => prev + 1);
    setMode(mode === "light" ? "dark" : "light");
  }

  const appClasses = classNames(styles.App, {});

  return (
    <div className={appClasses} data-color-scheme={mode} data-testid="app">
      <Header handleToggle={handleDarkModeToggle} number={cartNumber} />
      <main>
        <Outlet context={{ cartNumber } satisfies ContextType} />
      </main>
      <Footer />
    </div>
  );
}

export function useNumber() {
  return useOutletContext<ContextType>();
}

export default App;
