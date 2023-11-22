import { useParams } from "react-router-dom";

import { useTitle } from "../../hooks/useTitle";

import styles from "./Category.module.css";
import { Button } from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faPenToSquare, faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
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
    isFetching,
  } = postsApiSlice.useGetPostsByCategoryQuery({ id: id ?? "" });

  const navigate = useNavigate();

  const [deletePost, { isLoading: isDeleting, originalArgs }] =
    postsApiSlice.useDeletePostMutation();

  useEffect(() => {
    if (isQueryError) {
      toast.error("Failed to load posts", { id: "posts" });
    }
  }, [isQueryError]);

  async function handleDeletePost(_id: string) {
    try {
      toast.loading("Deleting post...", { id: "posts" });
      await deletePost({ id: _id }).unwrap();
      toast.success("Post deleted", { id: "posts" });
    } catch (err) {
      toast.error("Failed to delete post", { id: "posts" });
    }
  }

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

            <div className={styles.postControls}>
              <Button
                options={{ isIcon: true }}
                onClick={() => {
                  navigate(`/edit/${post._id}`);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className={classNames("fa-fw")} />
              </Button>
              <Button
                disabled={(isDeleting || isFetching) && originalArgs?.id === post._id}
                options={{ isIcon: true }}
                onClick={() => {
                  handleDeletePost(post._id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} className={classNames("fa-fw")} />
              </Button>
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
