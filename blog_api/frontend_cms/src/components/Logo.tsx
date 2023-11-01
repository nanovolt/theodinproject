import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

type logoProps = {
  title: string;
};

export const Logo = ({ title }: logoProps) => {
  return (
    <div>
      <Link to="/" state={{ from: "link" }}>
        <h1 className={styles.title}>{title}</h1>
      </Link>
    </div>
  );
};
