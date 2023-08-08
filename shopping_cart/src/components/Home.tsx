import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Shopping cart | Home";
  }, []);

  return <h1>Shopping cart</h1>;
}
