import { configureStore } from "@reduxjs/toolkit";
import userSilce from "./Slices/userSlice";
import productSlice from "./Slices/productSlice";
import cartSlice from "./Slices/cartSlice";
import adminSlice from "./Slices/adminSlice";

export const store = configureStore({
  reducer: {
    userData: userSilce,
    productData: productSlice,
    cartData: cartSlice,
    adminData: adminSlice,
  },
});
