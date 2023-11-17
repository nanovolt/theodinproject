import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { CustomSelect } from "../../components/ReactSelect/CustomSelect";
import { categoriesApiSlice } from "../categories/categoriesApiSlice";
import { Post, editorActions } from "./EditorSlice";
import styles from "./PostDetails.module.css";

type PostDetailsProps = {
  post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
  const dispatch = useAppDispatch();

  const { data: categories } = categoriesApiSlice.useGetCategoriesQuery();

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
          value={post.date}
          onChange={(e) => {
            dispatch(editorActions.editPost({ key: "date", value: e.target.value }));
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
