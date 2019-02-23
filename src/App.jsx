import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';

class App extends Component {
  isAuthenticated = () => !!localStorage.getItem('id');

  render() {
    return this.isAuthenticated() ? (
      <Switch>
        <Route path="/" component={Home} exact />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={Login} exact />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default App;
