import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./components/Home";
import { Shop } from "./components/Shop";
import { About } from "./components/About";
import { Cart } from "./components/Cart";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Link to="theodinproject/shopping_cart">shopping_cart</Link>,
      errorElement: "error",
    },
    {
      path: "/theodinproject/shopping_cart",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
