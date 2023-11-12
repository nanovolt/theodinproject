import { categoriesApiSlice } from "../features/categories/categoriesSlice";
import { useTitle } from "../hooks/useTitle";

export const Categories = () => {
  useTitle("Categories | Blog CMS");

  const { data, isSuccess } = categoriesApiSlice.useGetCategoriesQuery();

  if (isSuccess) {
    return (
      <div>
        {data.map((category: any) => (
          <div key={category._id}>{category.title}</div>
        ))}
      </div>
    );
  }
};
