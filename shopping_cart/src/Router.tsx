import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./Home";
import { Shop } from "./Shop";
import { About } from "./About";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <a href="theodinproject/shopping_cart">shopping_cart</a>,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
