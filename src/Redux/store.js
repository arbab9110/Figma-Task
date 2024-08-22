import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import stateSlice from "./stateSlice";

export const store = configureStore({
  reducer: {
    userData: userSlice,
    state: stateSlice
  }
});
