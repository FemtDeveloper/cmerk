import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
  },
});
