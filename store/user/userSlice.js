import { createSlice } from "@reduxjs/toolkit";
import { getFavoriteProducts } from "./thunks";

// const getFavorites = async () => {
//   const resp = await tesloApi("/get-favorites");
//   const favoritesIds = await resp.data;
//   console.log(favoritesIds);
//   return favoritesIds;
// };

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
