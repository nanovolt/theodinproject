import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Post = {
  title: string;
  date: string;
  categoryId: string;
  content: string;
};

type EditorState = {
  isPreview: boolean;
  isEdit: boolean;
  postId: string;
  post: Post;
};

const initialState: EditorState = {
  isPreview: false,
  isEdit: false,
  postId: "",
  post: {
    title: "",
    date: "",
    categoryId: "",
    content: "",
  },
};

type Payload = {
  key: keyof Post;
  value: string;
};

// type payload = Record<keyof Post, string>

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    editPost: (state, action: PayloadAction<Payload>) => {
      state.post[action.payload.key] = action.payload.value;
    },
    clearPost: (state) => {
      // console.log(`${property}: ${object[property]}`);
      Object.keys(state.post).forEach((k) => {
        state.post[k as keyof Post] = "";
      });
    },
    togglePreview: (state) => {
      state.isPreview = !state.isPreview;
    },
    setPreview: (state) => {
      state.isPreview = true;
    },
    unsetPreview: (state) => {
      state.isPreview = false;
    },
    toggleEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
    setEdit: (state) => {
      state.isEdit = true;
    },
    unsetEdit: (state) => {
      state.isEdit = false;
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    unsetPostId: (state) => {
      state.postId = "";
    },
  },
});

export const { reducer: editorReducer, actions: editorActions } = editorSlice;

export const selectIsPreview = (state: RootState) => state.editor.isPreview;
export const selectIsEdit = (state: RootState) => state.editor.isEdit;
export const selectPostId = (state: RootState) => state.editor.postId;
export const selectPost = (state: RootState) => state.editor.post;
