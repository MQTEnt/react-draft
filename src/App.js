import React from 'react';
import Main from './Main';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/admin" component={Main} />
        <Redirect from="/" to="/admin/dashboad" />
      </Switch>
    </Router>
  );
}