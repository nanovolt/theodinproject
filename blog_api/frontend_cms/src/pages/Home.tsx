import styles from "./Home.module.css";

import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { postsApiSlice } from "../features/posts/postsApiSlice";
import { categoriesApiSlice } from "../features/categories/categoriesApiSlice";

export function Home() {
  useTitle("Home | Blog CMS");

  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  const { data: posts } = postsApiSlice.useGetPostsQuery();

  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>User: {currentUser?.user.username}</p>
      <p>Total posts: {posts?.length}</p>
      <p>Total categories: {categories?.length}</p>
    </div>
  );
}
