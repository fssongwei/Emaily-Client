import { FETCH_PRODUCT } from "../actions/types";

const productReducer = (state = null, action) => {
  if (action.type === FETCH_PRODUCT) {
    return action.product;
  }
  return state;
};

export default productReducer;
