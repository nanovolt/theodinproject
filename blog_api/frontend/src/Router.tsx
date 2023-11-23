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
import { Posts } from "./features/posts/Posts.tsx";
import { Categories } from "./features/categories/Categories.tsx";
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

        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Category />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
