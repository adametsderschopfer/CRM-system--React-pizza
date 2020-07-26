import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default ({ children }) => <Provider store={store}>{children}</Provider>;
