import { NavLink } from "react-router-dom";
import styles from "./CategoryList.module.scss";

type Props = {
  list: {
    id: number;
    category: string;
    to: string;
  }[];
};

export function CategoryList(props: Props) {
  return (
    <div>
      <h2>Category</h2>
      <nav className={styles.categories} aria-label="Categories">
        {props.list.map((item) => (
          <div className={styles.category} key={item.id}>
            <NavLink to={item.to} className={({ isActive }) => (isActive ? styles.active : "")}>
              {item.category}
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
}
