import { apiSlice } from "../api/apiSlice";

type Category = {
  _id: string;
  title: string;
};

// type GetCategoriesResponse = {
//   _id: string;
//   title: string;
// };

type CreateCategoryPayload = {
  title: string;
};

type DeleteCategoryPayload = {
  _id: string;
};

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "cms/categories",
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

    createCategory: builder.mutation<Category, CreateCategoryPayload>({
      query: (payload) => ({
        url: "cms/categories",
        method: "POST",
        body: payload,
        credentials: "include",
      }),

      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    deleteCategory: builder.mutation<Category, DeleteCategoryPayload>({
      query: (payload) => ({
        url: `cms/categories/${payload._id}`,
        method: "DELETE",
        body: payload,
        credentials: "include",
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: "Categories", id: _id }],
    }),
  }),
});
