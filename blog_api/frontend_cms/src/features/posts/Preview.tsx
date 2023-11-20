import styles from "./Preview.module.css";

import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectIsEdit, selectPost, selectPostId } from "./EditorSlice";
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
import { validateEditor } from "./EditorValidator";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentEditor } from "@tiptap/react";
import { bundlePayload } from "./bundlePayload";

// const lowlight = createLowlight(common);

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("typescript", ts);

export const Preview = () => {
  const { editor } = useCurrentEditor();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEdit = useAppSelector(selectIsEdit);
  const postId = useAppSelector(selectPostId);
  const post = useAppSelector(selectPost);

  const { data: fetchedPost } = postsApiSlice.useGetPostByIdQuery({ id: postId });
  const { data: currentUser } = currentUserApiSlice.useMeQuery();
  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

  const [createPost, { reset }] = postsApiSlice.useCreatePostMutation({
    fixedCacheKey: "sharedCreatePostKey",
  });

  const [update] = postsApiSlice.useUpdatePostMutation();

  const chosenCategory = categories!.find((cat) => cat._id === post.categoryId);

  async function handlePublish() {
    const isValid = validateEditor(post, "");

    if (!isValid) {
      return;
    }

    try {
      toast.loading("Creating post...", { id: "editor" });
      await createPost({ ...post, isPublished: true }).unwrap();

      editor?.chain().focus().clearContent().run();

      navigate("/posts");

      toast.success("Post created", { id: "editor" });
    } catch (err) {
      reset();
      toast.error("Failed to create post", { id: "editor" });
    }
  }

  async function handlePublishEdit(html: string = post.content) {
    const isValid = validateEditor(post, html);

    if (!isValid || !fetchedPost) {
      return;
    }

    try {
      toast.loading("Editing post...", { id: "editor" });

      const { hasPayload, payload } = bundlePayload(post, html, fetchedPost);

      if (hasPayload) {
        await update({ id: postId, payload });
      }

      editor?.chain().focus().clearContent().run();

      navigate("/posts", { replace: true });

      if (hasPayload) {
        toast.success("Post edited", { id: "editor" });
        return;
      }

      toast.error("Edit had no changes", { id: "editor" });
    } catch (err) {
      reset();
      toast.error("Failed to edit post", { id: "editor" });
    }
  }

  useEffect(() => {
    const highlightedBlock = document.querySelector("[data-highlighted=yes]");
    // highlightedBlock?.removeAttribute("data-highlighted");
    if (!highlightedBlock) {
      hljs.highlightAll();
    }
  }, [post]);

  return (
    <div className={styles.preview}>
      <div className="controls">
        <button
          className={styles.button}
          onClick={() => {
            if (isEdit) {
              handlePublishEdit();
              return;
            }
            handlePublish();
          }}
        >
          {isEdit ? "Publish Edit" : "Publish"}
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
        <Link to={`/categories/${post.categoryId}`} className={styles.postCategory}>
          {chosenCategory ? chosenCategory.title : "No category"}
        </Link>
        <article>{parse(post.content)}</article>
      </div>
    </div>
  );
};
