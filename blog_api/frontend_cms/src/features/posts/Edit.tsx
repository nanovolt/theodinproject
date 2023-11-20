import { useTitle } from "../../hooks/useTitle";
import { TipTapEditor } from "./TipTapEditor";
import styles from "./Editor.module.css";
import { Preview } from "./Preview";
import { PostDetails } from "./PostDetails";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectIsPreview } from "./EditorSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { postsApiSlice } from "./postsApiSlice";

export const Edit = () => {
  useTitle("Edit | Blog CMS");

  const dispatch = useAppDispatch();

  const isPreview = useAppSelector(selectIsPreview);

  const params = useParams();

  const { data, isError } = postsApiSlice.useGetPostByIdQuery({ id: params.id ?? "" });

  useEffect(() => {
    dispatch(editorActions.setEdit());

    if (data) {
      dispatch(editorActions.setPostId(params.id ?? ""));

      dispatch(
        editorActions.setPost({
          title: data.title,
          categoryId: data.categoryId ? data.categoryId._id : "",
          date: data.date,
          content: data.content,
        })
      );
    }

    return () => {
      dispatch(editorActions.clearPost());
      dispatch(editorActions.unsetPostId());
      dispatch(editorActions.unsetEdit());
      dispatch(editorActions.unsetPreview());
    };
  }, [data, dispatch, params.id]);

  if (isError) {
    throw Error(`Post not found`);
  }

  return (
    <div className={styles.editorContainer}>
      <h1 className={styles.pageTitle}>Edit</h1>

      {isPreview && <Preview />}
      <div className={styles.wrapper}>
        {!isPreview && (
          <>
            <TipTapEditor />
            <PostDetails />
          </>
        )}
      </div>
    </div>
  );
};
