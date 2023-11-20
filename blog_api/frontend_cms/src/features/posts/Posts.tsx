import { useTitle } from "../../hooks/useTitle";
import { postsApiSlice } from "./postsApiSlice";
import styles from "./Posts.module.css";
import { Button } from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faPenToSquare, faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const navigate = useNavigate();

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isQueryError,
    isFetching,
  } = postsApiSlice.useGetPostsQuery();

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

  if (posts && posts.length === 0) {
    postList = <p>Post list is empty</p>;
  }

  if (posts && posts.length > 0) {
    postList = (
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.post}>
            <div className={styles.left}>
              <a href={`posts/${post._id}`} className={styles.postLink}>
                <h2>{post.title}</h2>
              </a>
              {post.categoryId && (
                <p>
                  <a href={`categories/${post.categoryId._id}`} className={styles.categoryLink}>
                    {post.categoryId.title}
                  </a>
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
      <h1 className={styles.pageTitle}>Posts</h1>
      {postList}
    </div>
  );
};
