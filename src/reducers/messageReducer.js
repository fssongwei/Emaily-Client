import { POP_MESSAGE } from "../actions/types";

const messageReducer = (state = null, action) => {
  if (action.type === POP_MESSAGE) {
    return action.message;
  }
  return state;
};

export default messageReducer;
