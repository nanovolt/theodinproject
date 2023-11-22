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
import { Create } from "./features/posts/Create.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx";
import { Logout } from "./pages/Logout.tsx";
import { Posts } from "./features/posts/Posts.tsx";
import { Categories } from "./features/categories/Categories.tsx";
import { Edit } from "./features/posts/Edit.tsx";
import { Post } from "./features/posts/Post.tsx";
import { Category } from "./features/categories/Category.tsx";

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
          <Route path="edit/:id" element={<Edit />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<Category />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
