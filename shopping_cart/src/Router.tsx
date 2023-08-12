import {
  createBrowserRouter,
  Link,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import App from "./App";
import { Home } from "./components/Home";
import { Shop } from "./components/Shop";
import { About } from "./components/About";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Link to="theodinproject/shopping_cart">shopping_cart</Link>,
      errorElement: "error",
    },
    {
      path: "/theodinproject/shopping_cart",
      element: (
        <>
          <App />
          <ScrollRestoration />
        </>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "shop",
          element: <Shop />,
          children: [
            // {
            //   index: true,
            //   element: <Products />,
            // },
            {
              path: ":category",
              element: <Products />,
            },
            // {
            //   path: "men's-clothing",
            //   element: "men's clothing",
            // },
            // {
            //   path: "women's-clothing",
            //   element: "women's clothing",
            // },
            // {
            //   path: "jewelry",
            //   element: "jewelry",
            // },
            // {
            //   path: "electronics",
            //   element: "electronics",
            // },
          ],
        },
        // {
        //   path: "shop/:category",
        //   element: <Products />,
        // },
        // {
        //   path: "shop/:category",
        //   element: <Products />,
        // },
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
