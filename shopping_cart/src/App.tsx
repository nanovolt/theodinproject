import styles from "./App.module.scss";
import { useLocalStorage } from "./hooks/useLocalStorage";
import classNames from "classnames";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [colorScheme, setColorScheme] = useLocalStorage(
    defaultDark ? "dark" : "light",
    "colorScheme"
  );

  function handleDarkModeToggle() {
    setColorScheme((prev: "dark" | "light") =>
      prev === "dark" ? "light" : "dark"
    );
  }

  const appClasses = classNames(styles.App, {});

  return (
    <div
      className={appClasses}
      data-color-scheme={colorScheme}
      data-testid="app">
      <h1>Shopping cart</h1>
      <button onClick={handleDarkModeToggle}>toggle dark mode</button>
    </div>
  );
}

export default App;
