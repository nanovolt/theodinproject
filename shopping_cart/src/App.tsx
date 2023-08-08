import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./Header";
import { useDarkMode } from "./hooks/useDarkMode";
import classNames from "classnames";
import { Footer } from "./Footer";
// import { useFetch } from "./hooks/useFetch";s

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

  function handleDarkModeToggle() {
    // setColorScheme((prev: "dark" | "light") =>
    //   prev === "dark" ? "light" : "dark"
    // );

    setMode(mode === "light" ? "dark" : "light");
  }

  const appClasses = classNames(styles.App, {});

  return (
    <div className={appClasses} data-color-scheme={mode} data-testid="app">
      <Header handleToggle={handleDarkModeToggle} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
