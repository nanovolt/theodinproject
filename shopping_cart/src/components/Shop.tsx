import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export function Shop() {
  const { data, isLoading, isError, errorMessage } = useFetch(
    "https://fakestoreapi.com/products"
  );

  // console.log(data);
  useEffect(() => {
    document.title = "Shopping cart | Shop";
  }, []);

  return (
    <div className="shop">
      <h2> Shop</h2>
      {data && <div className="products">{data}</div>}
    </div>
  );
}
