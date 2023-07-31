import styles from "./App.module.scss";
import useLocalStorage from "./hooks/useLocalStorage";
import classNames from "classnames";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [colorScheme, setColorScheme] = useLocalStorage(
    defaultDark ? "dark" : "light",
    "colorScheme"
  );

  function handleDarkModeToggle() {
    setColorScheme((prev: string) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "dark";
    });
  }

  const appClasses = classNames(styles.App, {});

  return (
    <div className={appClasses} data-color-scheme={colorScheme}>
      <h1>Shopping cart</h1>
      <button onClick={handleDarkModeToggle}>toggle dark mode</button>
    </div>
  );
}

export default App;
