import { useEffect } from "react";

export function Shop() {
  useEffect(() => {
    document.title = "Shopping cart | Shop";
  }, []);

  return <h2>Shop</h2>;
}
