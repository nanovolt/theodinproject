import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categoriesApiSlice } from "../categories/categoriesApiSlice";
import { editorActions, selectPost } from "./EditorSlice";
import styles from "./PostDetails.module.css";

export const PostDetails = () => {
  const dispatch = useAppDispatch();

  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

  const post = useAppSelector(selectPost);

  let dateToRender = "";
  if (post.date) {
    const iso = DateTime.fromISO(post.date).toISODate();
    if (iso) {
      dateToRender = iso;
    }
  }

  return (
    <div className={styles.postDetails}>
      <div className={styles.detailItem}>
        <input
          type="text"
          placeholder="title..."
          value={post.title}
          onChange={(e) => {
            dispatch(editorActions.editPost({ key: "title", value: e.target.value }));
          }}
        />
      </div>

      <div className={styles.detailItem}>
        <input
          type="date"
          value={dateToRender}
          onChange={(e) => {
            if (!e.target.value) {
              dispatch(editorActions.editPost({ key: "date", value: "" }));
              return;
            }

            const offset = DateTime.fromISO(e.target.value).toISO();

            if (!offset) return;
            dispatch(editorActions.editPost({ key: "date", value: offset }));
          }}
        />
      </div>
      <div className={styles.detailItem}>
        <select
          className={styles.select}
          value={post.categoryId ? post.categoryId : ""}
          name="categoryId"
          onChange={(e) => {
            dispatch(editorActions.editPost({ key: "categoryId", value: e.target.value }));
          }}
        >
          <option value="">-- No category --</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
