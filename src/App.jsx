import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';

class App extends Component {
  isAuthenticated = () => !!localStorage.getItem('id');
  logout = () => {
    // if (window.location === '/logout'){
    //   localStorage.clear()
    //   return (<Redirect to='/login'/>)
  }

  render() {
    return this.isAuthenticated() ? (
      <Switch>
        <Route path="/" component={Home} />
        {this.logout()}
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
