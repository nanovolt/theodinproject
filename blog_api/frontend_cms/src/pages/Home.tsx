import { useTitle } from "../hooks/useTitle";

export function Home() {
  useTitle("Home | Blog CMS");

  return (
    <div>
      <h1>Blog CMS</h1>
    </div>
  );
}
