import { apiSlice } from "../api/apiSlice";

type Post = {
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

type CreatedPost = {
  title: string;
  content: string;
  date: string;
  categoryId: string;
  isPublished: boolean;
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

    createPost: builder.mutation<void, CreatedPost>({
      query: (payload) => ({
        url: "cms/posts",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    deletePost: builder.mutation<void, { id: string }>({
      query: (payload) => ({
        url: `cms/posts/${payload.id}`,
        method: "DELETE",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Posts", id: arg.id }],
    }),
  }),
});
