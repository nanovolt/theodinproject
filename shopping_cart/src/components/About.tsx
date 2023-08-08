import { useEffect } from "react";

export function About() {
  useEffect(() => {
    document.title = "Shopping cart | About";
  }, []);

  return <h2>About</h2>;
}
