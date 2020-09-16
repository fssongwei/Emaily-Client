import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import cartReducer from "./cartReducer";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  user: authReducer,
  form: formReducer,
  message: messageReducer,
  cart: cartReducer,
});
