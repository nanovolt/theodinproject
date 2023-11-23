import { apiSlice } from "../api/apiSlice";

export type FetchPost = {
  _id: string;
  title: string;
  content: string;
  date: string;
  categoryId: null | {
    _id: string;
    title: string;
  };
  authorId: null | {
    _id: string;
    username: string;
  };
  viewCount: number;
  isPublished: boolean;
  dateFormat: string;
  id: string;
};

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<FetchPost[], void>({
      query: () => ({
        url: "blog/posts",
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

    getPostsByCategory: builder.query<FetchPost[], { id: string }>({
      query: (payload) => ({
        url: `blog/posts/category/${payload.id}`,
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

    getPostById: builder.query<FetchPost, { id: string }>({
      query: (payload) => ({
        url: `blog/posts/${payload.id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (_result, _err, arg) => [{ type: "Posts" as const, id: arg.id }],
    }),
  }),
});
