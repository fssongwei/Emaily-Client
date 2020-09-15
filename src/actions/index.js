import { FETCH_AUTH_STATUS, POP_MESSAGE } from "./types";
import axios from "axios";
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

export const popMessage = (message) => {
  return { type: POP_MESSAGE, message: message };
};
