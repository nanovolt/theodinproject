import { useCurrentEditor } from "@tiptap/react";
import styles from "./MainControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Post, editorActions, selectIsEdit, selectPost, selectPostId } from "./EditorSlice";
import { postsApiSlice } from "./postsApiSlice";
import toast from "react-hot-toast";
import { validateEditor } from "./EditorValidator";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

export const MainControls = () => {
  const { editor } = useCurrentEditor();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(selectIsEdit);

  const [createPost, { reset }] = postsApiSlice.useCreatePostMutation({
    fixedCacheKey: "sharedCreatePostKey",
  });

  const [update] = postsApiSlice.useUpdatePostMutation();

  const postId = useAppSelector(selectPostId);
  const post = useAppSelector(selectPost);

  const { data: fetchedPost } = postsApiSlice.useGetPostByIdQuery({ id: postId });

  useEffect(() => {
    if (!editor) {
      return;
    }

    // imperatively tell editor to load content,
    // otherwise tiptap doesn't load content from selectPost selector
    // when editing for some reason
    editor.commands.setContent(post.content);
  }, [editor, post.content]);

  if (!editor) {
    return null;
  }

  if (!fetchedPost) {
    return;
  }

  async function handlePublish(html: string) {
    const isValid = validateEditor(post, html);

    if (!isValid) {
      return;
    }

    try {
      // console.log("Creating post:", { ...post, content: html, isPublished: true });
      toast.loading("Creating post...", { id: "post" });
      await createPost({ ...post, content: html, isPublished: true }).unwrap();

      editor?.chain().focus().clearContent().run();

      dispatch(editorActions.clearPost());
      dispatch(editorActions.unsetPostId());
      dispatch(editorActions.unsetEdit());
      dispatch(editorActions.unsetPreview());

      navigate("/posts");

      toast.success("Post created", { id: "post" });
    } catch (err) {
      reset();
      toast.error("Failed to create post", { id: "post" });
    }
  }

  async function handlePublishEdit(html: string) {
    const isValid = validateEditor(post, html);

    if (!isValid || !fetchedPost) {
      return;
    }

    try {
      toast.loading("Editing post...", { id: "post" });

      const updatePayload: Partial<Post> = {};

      for (const key in fetchedPost) {
        const postValue = post[key as keyof Post];

        if (!postValue || key === "content" || key === "date") {
          continue;
        }

        let fetchedPostValue = fetchedPost[key as keyof typeof fetchedPost];
        if (fetchedPostValue && typeof fetchedPostValue === "object") {
          fetchedPostValue = fetchedPostValue._id;
        }
        console.log("key:", key);
        console.log(`fetched.${key}:`, fetchedPostValue);
        console.log(`post.${key}:`, postValue);
        if (fetchedPostValue !== postValue) {
          updatePayload[key as keyof Post] = postValue;
        }
      }

      console.log("fetchedPost:", fetchedPost.date);
      console.log("post:", post.date);

      const dtFetched = DateTime.fromISO(fetchedPost.date);
      const dtOffset = DateTime.fromISO(post.date);
      const dtEquals = dtFetched.equals(dtOffset);

      console.log("dates equals:", dtEquals);

      if (!dtEquals) {
        updatePayload.date = post.date;
      }

      console.log("fetchedPost.content:", fetchedPost.content);
      console.log("html:", html);
      if (fetchedPost.content !== html) {
        updatePayload.content = html;
      }

      console.log("updatePayload:", updatePayload);
      const hasPayload = Object.entries(updatePayload).length > 0;
      console.log("updatePayload has payload:", hasPayload);

      if (hasPayload) {
        await update({ id: postId, payload: updatePayload });
      }

      editor?.chain().focus().clearContent().run();

      dispatch(editorActions.clearPost());
      dispatch(editorActions.unsetPostId());
      dispatch(editorActions.unsetEdit());
      dispatch(editorActions.unsetPreview());

      navigate("/posts", { replace: true });

      if (hasPayload) {
        toast.success("Post edited", { id: "post" });
        return;
      }

      toast.success("Edit had no changes", { id: "post" });
    } catch (err) {
      reset();
      toast.error("Failed to edit post", { id: "post" });
    }
  }

  return (
    <div className={styles.mainControls}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            const html = editor.getHTML();
            if (isEdit) {
              handlePublishEdit(html);
              return;
            }
            handlePublish(html);
          }}
        >
          {isEdit ? "Publish Edit" : "Publish"}
          <FontAwesomeIcon icon={faUpload} style={{ marginLeft: "8px" }} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            const html = editor.getHTML();

            const isValid = validateEditor(post, html);

            if (!isValid) {
              return;
            }

            dispatch(editorActions.editPost({ key: "content", value: html }));
            dispatch(editorActions.togglePreview());
          }}
        >
          Preview
          <FontAwesomeIcon icon={faNewspaper} style={{ marginLeft: "8px" }} />
        </button>
      </div>
    </div>
  );
};
