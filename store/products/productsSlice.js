import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setAllProducts: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.error = false;
    },
    setError: (state) => {
      state.error = true;
    },
    deleteProduct: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.allProducts = state.allProducts.filter(
        (product) => action.payload !== product.id
      );
    },
  },
});

export const { setLoading, setError, setAllProducts, deleteProduct } =
  productsSlice.actions;
