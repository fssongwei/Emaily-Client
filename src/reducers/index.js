import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import productReducer from "./productReducer";
import messageReducer from "./messageReducer";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  products: productsReducer,
  product: productReducer,
  message: messageReducer,
});
