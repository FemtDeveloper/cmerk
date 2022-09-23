import { tesloApi } from "api";
import { deleteProduct, setAllProducts, setError } from "./productsSlice";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await tesloApi("/get-all-products");
      const products = data.products;
      await dispatch(setAllProducts(products));
    } catch (error) {
      console.error(error);
      dispatch(setError());
    }
  };
};

export const startDeletingProduct = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error(error);
      dispatch(setError());
    }
  };
};
