import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import styles from "./Shop.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: Rating;
};

type ProductsContextType = {
  all: Product[] | null;
  mensClothing: Product[] | null;
  womensClothing: Product[] | null;
  jewelery: Product[] | null;
  electronics: Product[] | null;
};

export function Shop() {
  const { data, isLoading, isError, errorMessage } = useFetch(
    "https://fakestoreapi.com/products"
  );

  let all = null;
  let mensClothing = null;
  let womensClothing = null;
  let jewelery = null;
  let electronics = null;

  function getAllByCategory(category: string, arr: Product[]) {
    return arr.filter((item) => item.category === category);
  }

  if (data) {
    all = data;
    mensClothing = getAllByCategory("men's clothing", data);
    womensClothing = getAllByCategory("women's clothing", data);
    jewelery = getAllByCategory("jewelery", data);
    electronics = getAllByCategory("electronics", data);
  }

  useEffect(() => {
    document.title = "Shopping cart | Shop";
  }, []);

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  const loading = classNames(styles.shop, styles.center);

  if (isLoading) {
    return (
      <div className={loading}>
        <FontAwesomeIcon title="Spinning fan" icon={faFan} spin size="8x" />
      </div>
    );
  }

  return (
    <div className={styles.shop}>
      <div className={styles.left}>
        <h2>Category</h2>
        <div className={styles.categories}>
          <div className="category">
            <NavLink
              to="all"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }>
              All
            </NavLink>
          </div>
          <div className="category">
            <NavLink
              to="men's-clothing"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }>
              Men's clothing
            </NavLink>
            {/* <Link to="men's-clothing">Men's clothing</Link> */}
          </div>
          <div className="category">
            <NavLink
              to="women's-clothing"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }>
              Women's clothing
            </NavLink>
            {/* <Link to="women's-clothing">Women's clothing</Link> */}
          </div>
          <div className="category">
            <NavLink
              to="jewelery"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }>
              Jewelery
            </NavLink>
            {/* <Link to="jewelery">Jewelery</Link> */}
          </div>
          <div className="category">
            <NavLink
              to="electronics"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }>
              Electronics
            </NavLink>
            {/* <Link to="electronics">Electronics</Link> */}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Outlet
          context={
            {
              all,
              mensClothing,
              womensClothing,
              jewelery,
              electronics,
            } satisfies ProductsContextType
          }
        />
      </div>
    </div>
  );
}

export function useProducts() {
  return useOutletContext<ProductsContextType>();
}
