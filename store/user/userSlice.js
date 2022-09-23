import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteProducts: [],
  isLoading: false,
  error: false,
  phoneNumber: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setFavorites: (state, action) => {
      state.isLoading = false;
      state.favoriteProducts = action.payload;
      state.error = false;
    },
    setError: (state) => {
      state.error = true;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setLoading, setError, setFavorites, setPhoneNumber, setRole } =
  userSlice.actions;
