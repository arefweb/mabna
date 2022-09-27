import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes