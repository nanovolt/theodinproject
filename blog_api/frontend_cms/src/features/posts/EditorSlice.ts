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
  post: Post;
};

const initialState: EditorState = {
  isPreview: false,
  isEdit: false,
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
  },
});

export const { reducer: editorReducer, actions: editorActions } = editorSlice;

export const selectIsPreview = (state: RootState) => state.editor.isPreview;
export const selectIsEdit = (state: RootState) => state.editor.isEdit;

export const selectPost = (state: RootState) => state.editor.post;
