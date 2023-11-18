import styles from "./Preview.module.css";

import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectPost } from "./EditorSlice";
import toast from "react-hot-toast";
import { categoriesApiSlice } from "../categories/categoriesApiSlice";
import { postsApiSlice } from "./postsApiSlice";
import { DateTime } from "luxon";
import { currentUserApiSlice } from "../currentUser/currentUserSlice";

// import { common, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { useEffect } from "react";
import hljs from "highlight.js/lib/core";

// const lowlight = createLowlight(common);

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("typescript", ts);

export const Preview = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  const { data: currentUser } = currentUserApiSlice.useMeQuery();

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

  useEffect(() => {
    hljs.highlightAll();
  }, []);

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

      <div className={styles.post}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDate}>
          {DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED)}
        </p>
        <p className={styles.postAuthor}>by {currentUser!.user.username}</p>
        <p className={styles.postCategory}>
          {chosenCategory ? chosenCategory.title : "No category"}
        </p>

        <article>{parse(post.content)}</article>
      </div>
    </div>
  );
};
