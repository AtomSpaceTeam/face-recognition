import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Main, Form} from './components/index';

class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <div>
                <Route path='/' component={Main} exact/>
                <Route path='/login' component={Form}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;