import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Error404 from './components/Error404/Error404';

class App extends Component {
  isAuthenticated = () => !!localStorage.getItem('id');

  onLogout = () => {
    localStorage.removeItem('id');
    return <Redirect to="/login" />
  }

  onHome = () => {
    return <Redirect to='/home' />
  }

  onError404 = () => {
    return <Redirect to='/Error404' />
  }

  render() {
    return this.isAuthenticated() ? (
      <Switch>
        <Route path="/logout" render={this.onLogout} exact />
        <Route path="/:pageName" component={Home} />
        <Route path="/" render={this.onHome} />
        <Route component={Error404} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={Login} exact />
        <Redirect to="/login" />
        <Route component={Error404} />
      </Switch>
    );
  }
}

export default App;
