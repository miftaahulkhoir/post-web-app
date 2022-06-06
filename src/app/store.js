import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/root/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
