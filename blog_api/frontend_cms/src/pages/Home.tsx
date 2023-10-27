import { useTitle } from "../hooks/useTitle";

export function Home() {
  useTitle("Blog CMS | Home");

  return (
    <div>
      <h1>Blog CMS</h1>
    </div>
  );
}
