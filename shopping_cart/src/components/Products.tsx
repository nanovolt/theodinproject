import { useParams } from "react-router-dom";
import { Card } from "./Card";
import styles from "./Products.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../context/ProductsContext";
import classNames from "classnames";

function makeReadableCategoryName(category: string) {
  const first = category.split("-")[0][0].toUpperCase();
  const rest = category.split("-").slice(1);

  // console.log("first:", first);
  // console.log("rest:", rest);
  // console.log("result:", first + category.split("-")[0].slice(1) + " " + rest);

  if (rest.length === 0) {
    return first + category.split("-")[0].slice(1);
  }
  return first + category.split("-")[0].slice(1) + " " + rest;
}

const loading = classNames(styles.shop, styles.center);

export function Products() {
  const { category } = useParams();
  const { products, isLoading, isError, errorMessage } = useProducts();

  if (isError) {
    return <div>Products: Error: ${errorMessage}</div>;
  }

  if (isLoading) {
    return (
      <div className={loading}>
        <FontAwesomeIcon title="Spinning fan" icon={faFan} spin size="8x" />
      </div>
    );
  }

  let categoryName;
  if (category) {
    categoryName = makeReadableCategoryName(category);

    const split = category.split("-").join(" ");
    const data = products[split];

    return (
      <section className={styles.products}>
        <h2>{category ? categoryName : "All"}</h2>

        <div className={styles.cards}>
          {data.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </section>
    );
  }
  return <h1>no category</h1>;
}
