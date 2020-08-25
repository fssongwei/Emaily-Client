import { FETCH_AUTH_STATUS } from "../actions/types";

const authReducer = (state = null, action) => {
  if (action.type === FETCH_AUTH_STATUS) {
    return action.user;
  }
  return state;
};

export default authReducer;
