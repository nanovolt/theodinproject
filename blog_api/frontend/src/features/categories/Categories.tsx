import styles from "./Categories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { categoriesApiSlice } from "./categoriesApiSlice";
import { useTitle } from "../../hooks/useTitle";
import { Link } from "react-router-dom";

export const Categories = () => {
  useTitle("Categories | Blog CMS");

  const {
    data: categories,
    isError: isQueryError,
    isLoading: isCategoriesLoading,
    isSuccess: haveCategories,
  } = categoriesApiSlice.useGetCategoriesQuery();

  let categoryList = null;

  if (isQueryError) {
    categoryList = <p className={styles.center}>Failed to load categories</p>;
  }

  if (isCategoriesLoading) {
    categoryList = (
      <div className={styles.center}>
        <span>
          Loading...
          <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
        </span>
      </div>
    );
  }

  if (haveCategories) {
    categoryList = (
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category._id} className={styles.listItem}>
            <Link to={`/categories/${category._id}`} className={styles.category}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.categoriesContainer}>
      <h1>Categories</h1>
      {categoryList}
    </div>
  );
};
