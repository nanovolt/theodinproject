import { apiSlice } from "../api/apiSlice";

type Category = {
  _id: string;
  title: string;
};

// type GetCategoriesResponse = {
//   _id: string;
//   title: string;
// };

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "blog/categories",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Categories" as const, id: _id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
  }),
});
