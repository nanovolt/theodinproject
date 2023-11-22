import styles from "./App.module.css";
import "./toaster.css";

import classNames from "classnames";

import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { useDarkModeContext } from "./context/DarkModeContext";
import { Header } from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const mode = useDarkModeContext();
  const appClasses = classNames(styles.App, {});

  return (
    <div className={appClasses} data-color-scheme={mode} data-testid="app">
      <Toaster
        toastOptions={{
          className: "toaster",
          // style: {
          //   borderRadius: 0,
          // },
        }}
      />
      <Header />
      <main>
        <div className={styles.mainWrapper}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
