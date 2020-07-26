import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import App from "./App";
import Provider from "./redux";
import * as serviceWorker from "./serviceWorker";

const app = (
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
