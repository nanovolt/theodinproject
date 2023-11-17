import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counterSlice";
import { apiSlice } from "../features/api/apiSlice";
import { navigationReducer } from "../features/routerNavigation/navigation";
import { drawerReducer } from "../features/drawer/drawerSlice";
import { editorReducer } from "../features/posts/EditorSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    navigation: navigationReducer,
    drawer: drawerReducer,
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
