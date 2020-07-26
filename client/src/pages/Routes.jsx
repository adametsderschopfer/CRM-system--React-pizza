import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Cart from "./Cart";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};
