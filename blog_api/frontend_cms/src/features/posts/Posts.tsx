import { useTitle } from "../../hooks/useTitle";
import { postsApiSlice } from "./postsSlice";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const { data, isSuccess } = postsApiSlice.useGetPostsQuery();

  let content = null;
  if (isSuccess) {
    content = data.map((post) => (
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
        <p>{post.author}</p>
        <p>{post.category}</p>
        <p>{post.dateFormat}</p>
        <p>{post.isPublished}</p>
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
