import { useTitle } from "../../hooks/useTitle";
import { postsApiSlice } from "./postsApiSlice";
// import parse from "html-react-parser";
import styles from "./Posts.module.css";
import { Button } from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const navigate = useNavigate();

  const { data: posts } = postsApiSlice.useGetPostsQuery();

  const [deletePost] = postsApiSlice.useDeletePostMutation();

  if (!posts) {
    return <p>Error</p>;
  }

  if (posts.length === 0) {
    return (
      <div className={styles.postsContainer}>
        <h1 className={styles.pageTitle}>Posts</h1>
        <p>Post list is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.pageTitle}>Posts</h1>
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
                  // console.log(`edit post ${post._id}`);
                  navigate(`/edit/${post._id}`);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className={classNames("fa-fw")} />
              </Button>
              <Button
                options={{ isIcon: true }}
                onClick={async () => {
                  await deletePost({ id: post._id });
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} className={classNames("fa-fw")} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
