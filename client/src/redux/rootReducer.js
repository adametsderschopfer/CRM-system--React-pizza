import { combineReducers } from "redux";

import shop from "./reducers/shop.reducer";
import cart from "./reducers/cart.reducer";

export default combineReducers({
  shop,
  cart
})