import { apiSlice } from "../api/apiSlice";

type Credentials = {
  username: string;
  password: string;
};

type RegisterCredentials = {
  username: string;
  password: string;
  confirm_password: string;
};

type meQueryRespone = {
  message: string;
  user: {
    id: string;
    username: string;
  };
};

type LoginMutationResponse = {
  message: string;
  user: {
    id: string;
    username: string;
  };
};

type RegisterMutationResponse = {
  message: string;
  user: {
    id: string;
    username: string;
  };
};

type LogoutQueryResponse = {
  message: string;
};

export const currentUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<meQueryRespone, void>({
      query: () => ({
        url: "me",
        credentials: "include",
      }),

      providesTags: ["Me"],
    }),

    login: builder.mutation<LoginMutationResponse, Credentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          //
        }
      },
      invalidatesTags: ["Me"],
    }),

    register: builder.mutation<RegisterMutationResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.log(err);
        }
      },
      invalidatesTags: ["Me"],
    }),

    logout: builder.query<LogoutQueryResponse, void>({
      query: () => ({
        url: "logout",
        credentials: "include",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(currentUserApiSlice.util.resetApiState());
        } catch {
          //
        }
      },
    }),
  }),
});
