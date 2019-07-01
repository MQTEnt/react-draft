import React from 'react';
import Main from './Main';
import { Login, PrivateRoute } from './components/Auth/Login';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/admin" component={Main} />

        <Route path="/login" component={Login} />
        
        <Redirect from="/" to="/admin" />
      </Switch>
    </Router>
  );
}