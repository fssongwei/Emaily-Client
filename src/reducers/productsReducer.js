import { FETCH_PRODUCTS } from "../actions/types";

const productsReducer = (state = null, action) => {
  if (action.type === FETCH_PRODUCTS) {
    return action.products;
  }
  return state;
};

export default productsReducer;
