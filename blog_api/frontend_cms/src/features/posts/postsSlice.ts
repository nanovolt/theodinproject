import { apiSlice } from "../api/apiSlice";

type Post = {
  _id: string;
  title: string;
  text: string;
  date: string;
  category: null;
  author: null;
  viewCount: number;
  isPublished: boolean;
  dateFormat: string;
  id: string;
};

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: "cms/posts",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, id: _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    createPost: builder.mutation({
      query: (payload) => ({
        url: "cms/posts",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Posts", id: "List" }],
    }),
  }),
});
