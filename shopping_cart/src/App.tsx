import styles from "./App.module.scss";
import classNames from "classnames";

import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { useDarkModeContext } from "./context/DarkModeContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Header } from "./components/Header";

function App() {
  const mode = useDarkModeContext();
  const appClasses = classNames(styles.App, {});

  return (
    <ProductsProvider>
      <CartProvider>
        <div className={appClasses} data-color-scheme={mode} data-testid="app">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
