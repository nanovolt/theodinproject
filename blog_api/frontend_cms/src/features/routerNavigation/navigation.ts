import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface NavigationState {
  initialRoute: string;
}

// Define the initial state using that type
const initialState: NavigationState = {
  initialRoute: "",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setInitialRoute: (state, action: PayloadAction<string>) => {
      state.initialRoute = action.payload;
    },
  },
});

export const { reducer: navigationReducer, actions: navigationActions } = navigationSlice;

// Other code such as selectors can use the imported `RootState` type
export const selectInitialRoute = (state: RootState) => state.navigation.initialRoute;
