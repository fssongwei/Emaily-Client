import { FETCH_AUTH_STATUS } from "../actions/types";

const authReducer = (state = [true, null], action) => {
  if (action.type === FETCH_AUTH_STATUS) {
    return [false, action.user];
  }
  return state;
};

export default authReducer;
