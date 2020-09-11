import { FETCH_AUTH_STATUS, FETCH_PRODUCTS, POP_MESSAGE } from "./types";
import axios from "axios";
import history from "../history";
axios.defaults.withCredentials = true;

export const fetchAuthStatus = () => async (dispatch) => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/user`
    );
    dispatch({ type: FETCH_AUTH_STATUS, user: user.data });
  } catch (error) {
    dispatch({ type: FETCH_AUTH_STATUS, user: false });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`);
    dispatch({ type: FETCH_AUTH_STATUS, user: false });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProducts = (category) => async (dispatch) => {
  try {
    const products = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products`,
      {
        params: {
          category: category,
        },
      }
    );
    dispatch({ type: FETCH_PRODUCTS, products: products.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = async (id, setProduct) => {
  try {
    const product = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products/${id}`
    );
    setProduct(product.data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products/${id}?_method=DELETE`
    );
    dispatch(() =>
      popMessage({ status: "success", message: "Product delete successfully!" })
    );
    history.push("/");
  } catch (error) {
    dispatch(() => popMessage({ status: "error", message: "Unknown error!" }));
    console.log(error);
  }
};

export const popMessage = (message) => {
  return { type: POP_MESSAGE, message: message };
};
