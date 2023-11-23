import styles from "./Home.module.css";

import { useTitle } from "../hooks/useTitle";
import { postsApiSlice } from "../features/posts/postsApiSlice";
import { categoriesApiSlice } from "../features/categories/categoriesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function Home() {
  useTitle("Home | Blog CMS");

  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostQueryError,
  } = postsApiSlice.useGetPostsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoryQueryError,
  } = categoriesApiSlice.useGetCategoriesQuery();

  let postList = null;
  let categoryList = null;

  if (isPostQueryError) {
    postList = <p className={styles.center}>Failed to load posts</p>;
  }

  if (isCategoryQueryError) {
    categoryList = <p className={styles.center}>Failed to load categories</p>;
  }

  if (isPostsLoading) {
    postList = (
      <div className={styles.center}>
        <span>
          Loading...
          <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
        </span>
      </div>
    );
  }

  if (isCategoriesLoading) {
    categoryList = (
      <div className={styles.center}>
        <span>
          Loading...
          <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
        </span>
      </div>
    );
  }

  if (posts && posts.length === 0) {
    postList = <p>Post list is empty</p>;
  }

  if (categories && categories.length === 0) {
    categoryList = <p>Category list is empty</p>;
  }

  if (posts && posts.length > 0) {
    postList = (
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.post}>
            <div className={styles.left}>
              <Link to={`/posts/${post._id}`} className={styles.postLink}>
                <h2>{post.title}</h2>
              </Link>
              {post.categoryId && (
                <p>
                  <Link to={`/categories/${post.categoryId._id}`} className={styles.categoryLink}>
                    {post.categoryId.title}
                  </Link>
                </p>
              )}
              <p>{!post.categoryId && <a href="#">No category</a>}</p>
              <p className={styles.postDate}>
                {DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (categories && categories.length > 0) {
    categoryList = (
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category._id} className={styles.listItem}>
            <Link to={`/categories/${category._id}`} className={styles.category}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.home}>
      {postList}
      {!isMobile && categoryList}
    </div>
  );
}
