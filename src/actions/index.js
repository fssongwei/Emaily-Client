import { FETCH_AUTH_STATUS } from "./types";
import axios from "axios";
import history from "../history";

export const fetchAuthStatus = () => async (dispatch) => {
  try {
    const user = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
      withCredentials: true,
    });
    if (!user.data.isLogin) history.push("/");
    dispatch({ type: FETCH_AUTH_STATUS, user: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: FETCH_AUTH_STATUS, user: user.data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};