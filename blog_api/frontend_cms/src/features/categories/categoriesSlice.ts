import { apiSlice } from "../api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: "cms/categories",
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),
  }),
});
