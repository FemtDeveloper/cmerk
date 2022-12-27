import { miApi } from "api";
import { setError, setFavorites, setPhoneNumber, setRole } from "./userSlice";

export const getFavoriteProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await miApi("/get-favorites");
      const { favoriteProducts, phoneNumber, role } = data;

      dispatch(setFavorites(favoriteProducts));
      dispatch(setPhoneNumber(phoneNumber));
      dispatch(setRole(role));
    } catch (error) {
      console.error(error);
      dispatch(setError());
    }
  };
};
