import React from "react";
import { Switch } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";

import Route from './Route';
import Register from "../pages/Register";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/home" component={Home} isPrivate />
  </Switch>
);

export default Routes
