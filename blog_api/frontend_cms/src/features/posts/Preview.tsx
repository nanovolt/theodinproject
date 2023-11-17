import styles from "./Preview.module.css";

import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectPost } from "./EditorSlice";
import toast from "react-hot-toast";
import { categoriesApiSlice } from "../categories/categoriesApiSlice";
import { postsApiSlice } from "./postsApiSlice";

export const Preview = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

  const [createPost, { reset }] = postsApiSlice.useCreatePostMutation({
    fixedCacheKey: "sharedCreatePostKey",
  });

  const chosenCategory = categories!.find((cat) => cat._id === post.categoryId);

  async function handlePublish() {
    try {
      toast.loading("Creating post...", { id: "post" });

      await createPost({ ...post, isPublished: true });
      dispatch(editorActions.clearPost());

      toast.success("Post created", { id: "post" });
      dispatch(editorActions.togglePreview());
    } catch (err) {
      reset();
      toast.error("Failed to create post", { id: "post" });
    }
  }

  return (
    <div className={styles.preview}>
      <div className="controls">
        <button
          className={styles.button}
          onClick={() => {
            handlePublish();
          }}
        >
          Publish
          <FontAwesomeIcon icon={faUpload} style={{ marginLeft: "8px" }} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(editorActions.togglePreview());
          }}
        >
          Write
          <FontAwesomeIcon icon={faPencil} style={{ marginLeft: "8px" }} />
        </button>
      </div>

      <article>
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        <p>{chosenCategory ? chosenCategory.title : "No category"}</p>
        {parse(post.content)}
      </article>
    </div>
  );
};
