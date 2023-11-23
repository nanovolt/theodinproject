import { useParams } from "react-router-dom";

import { useTitle } from "../../hooks/useTitle";

import styles from "./Category.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { postsApiSlice } from "../posts/postsApiSlice";
import { categoriesApiSlice } from "./categoriesApiSlice";

export const Category = () => {
  const { id } = useParams();

  useTitle("Posts | Blog CMS");

  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

  const categoryTitle = categories?.find((category) => category._id === id);

  const {
    data: postByCategory,
    isLoading: isPostsLoading,
    isError: isQueryError,
  } = postsApiSlice.useGetPostsByCategoryQuery({ id: id ?? "" });

  let postList = null;

  if (isQueryError) {
    postList = <p className={styles.center}>Failed to load posts</p>;
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

  if (postByCategory && postByCategory.length === 0) {
    postList = <p>Post list is empty</p>;
  }

  if (postByCategory && postByCategory.length > 0) {
    postList = (
      <ul className={styles.postList}>
        {postByCategory.map((post) => (
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

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.pageTitle}>{categoryTitle?.title}</h1>
      {postList}
    </div>
  );
};
