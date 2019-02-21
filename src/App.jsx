import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';

class App extends Component {
    componentDidMount() {
        this.checkAuthorization();
    }

    checkAuthorization() {
        const { history } = this.props;
        if (localStorage.getItem('id') == null) {
            history.push('/');
        }
    }

    render() {
        return (
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/login' component={Login} exact />
                <Redirect to="/" />
            </Switch>
        );
    }
}

export default App;
