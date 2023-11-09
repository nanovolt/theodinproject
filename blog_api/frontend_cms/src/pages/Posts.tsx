import { categoriesApiSlice } from "../features/categories/categoriesSlice";
import { useTitle } from "../hooks/useTitle";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const { data, isSuccess } = categoriesApiSlice.useGetCategoriesQuery();

  if (isSuccess) {
    return (
      <div>
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
        {data.map((category: any) => (
          <div key={category._id}>{category.title}</div>
        ))}
      </div>
    );
  }
};
