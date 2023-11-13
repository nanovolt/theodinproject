import { useTitle } from "../../hooks/useTitle";
import { postsApiSlice } from "./postsSlice";

export const Create = () => {
  useTitle("Create | Blog CMS");

  const [create] = postsApiSlice.useCreatePostMutation();

  async function handleSubmit(data) {
    console.log(data);
    // await create(data);
  }

  return (
    <div>
      <h1>Create</h1>
    </div>
  );
};
