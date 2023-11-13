import {
  BaseQueryFn,
  // FetchArgs,
  // FetchBaseQueryError,
  // FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { currentUserApiSlice } from "../currentUser/currentUserSlice";
import { RootState } from "../../app/store";

const customBaseQuery: BaseQueryFn =
  // string | FetchArgs, // Args
  // unknown, // Result
  // FetchBaseQueryError, // Error
  // FetchBaseQueryMeta // Meta
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL, timeout: 30000 });

    const { data, error } = await baseQuery(args, api, extraOptions);

    // if we get 401 response code and
    // if we have current user data in the cache i.e. user logged in
    // purge the whole redux store, terminating local session
    if (error && error.status === 401) {
      const state = api.getState() as RootState;
      const currentUserData = state.api.queries["me(undefined)"]!.data;

      if (currentUserData) {
        api.dispatch(currentUserApiSlice.util.resetApiState());
        console.log("purged redux store, local session terminated");
      }
    }

    if (error) {
      return { error };
    }

    return { data };
  };

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:3000/api/v1",
  // }),
  baseQuery: customBaseQuery,
  tagTypes: ["Me", "Categories", "Posts"],
  endpoints: () => ({}),
});
