import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';

class App extends Component{
    check(){
        if (localStorage.getItem('id') == null){
          return <Redirect to='/login'/>
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {this.check()}
                    <Route path='/' component={Home} exact/>
                    <Route path='/login' component={Login}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;