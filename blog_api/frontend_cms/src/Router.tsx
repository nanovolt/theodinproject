import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom";
import App from "./App";

import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { Create } from "./pages/Create";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <App />
          <ScrollRestoration />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "create",
          element: <Create />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
