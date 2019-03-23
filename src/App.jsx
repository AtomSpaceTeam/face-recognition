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

  render() {
    return this.isAuthenticated() ? (
      <Switch>
        <Route path="/logout" render={this.onLogout} exact />
        <Route path="/:pageName" component={Home} />
        <Route path='/*' component={Error404} exact />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={Login} exact />
        <Redirect to="/login" />
        <Route path='/*' component={Error404} exact />
      </Switch>
    );
  }
}

export default App;
