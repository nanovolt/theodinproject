import { useTitle } from "../../hooks/useTitle";
import { postsApiSlice } from "./postsApiSlice";
// import parse from "html-react-parser";
import styles from "./Posts.module.css";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const { data: posts, isSuccess } = postsApiSlice.useGetPostsQuery();

  const [deletePost] = postsApiSlice.useDeletePostMutation();

  let content = null;
  if (isSuccess) {
    content = posts.map((post) => (
      <div key={post._id} className={styles.post}>
        <div>
          <a href={`posts/${post._id}`}>
            <h2>{post.title}</h2>
          </a>
        </div>
        {/* {parse(post.content)} */}
        {/* <p>{post.authorId ? post.authorId.username : "Unknown author"}</p> */}
        <p>{post.categoryId ? post.categoryId.title : "No category"}</p>
        <p>{post.dateFormat}</p>
        <div className={styles.postControls}>
          <button
            onClick={async () => {
              await deletePost({ id: post._id });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <h1>Posts</h1>
      {content}
      {/* <pre>{JSON.stringify(data, null, " ")}</pre> */}
    </div>
  );
};
