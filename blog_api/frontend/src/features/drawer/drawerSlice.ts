import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface drawerState {
  isOpen: boolean;
}

const initialState: drawerState = {
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },

    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { reducer: drawerReducer, actions: drawerActions } = drawerSlice;

// Other code such as selectors can use the imported `RootState` type
export const selectDrawer = (state: RootState) => state.drawer.isOpen;
