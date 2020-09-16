import { SET_CART } from "../actions/types";

const cartReducer = (state = [], action) => {
  if (action.type === SET_CART) {
    let updateItem = action.payload;
    let newState = [...state];
    let hasItem = false;
    for (let item of newState) {
      if (item.product._id === updateItem.product._id) {
        hasItem = true;
        item.amount = updateItem.amount;
      }
    }
    if (!hasItem) newState.push(updateItem);
    newState = newState.filter((item) => item.amount > 0);
    return newState;
  }
  return state;
};

export default cartReducer;
