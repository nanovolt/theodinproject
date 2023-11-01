import { categoriesApiSlice } from "../features/categories/categoriesSlice";
import { useTitle } from "../hooks/useTitle";

export const Posts = () => {
  useTitle("Posts | Blog CMS");

  const { data, isSuccess } = categoriesApiSlice.useGetCategoriesQuery();

  if (isSuccess) {
    return (
      <div>
        {data.map((category) => (
          <div key={category._id}>{category.title}</div>
        ))}
      </div>
    );
  }
};
