import { configureStore } from "@reduxjs/toolkit";
import  userSilce  from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    userData:userSilce
  },
});
