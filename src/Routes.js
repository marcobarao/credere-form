import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from "./pages/CustomerForm";
import NotFound from "./pages/NotFound";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Form} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
