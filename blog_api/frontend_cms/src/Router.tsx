import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import App from "./App";

import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { Create } from "./pages/Create";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx";
import { Logout } from "./pages/Logout.tsx";
import { Posts } from "./pages/Posts.tsx";
import { Categories } from "./features/categories/Categories.tsx";

export function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            <App />
            <ScrollRestoration />
          </>
        }
        errorElement={<ErrorPage />}
      >
        <Route index={true} element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute redirectPath="/login" />}>
          <Route path="logout" element={<Logout />} />
          <Route path="create" element={<Create />} />
          <Route path="posts" element={<Posts />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
