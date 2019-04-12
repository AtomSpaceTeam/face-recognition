import React from 'react';
import Loader from '../Loader';
import { Redirect } from 'react-router-dom';

class ChangePass extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            messages: ''
        }
    }

    onChange = (e) => {
		this.setState({ messages: ''});
		let key = e.target.name;
        let value = e.target.value;
        this.setState({[key]: value});
	}

    key = (e) => {
        if (e.key === 'Enter'){
            console.log(this.onSubmit());
        }
    }

    onSubmit = () => {
        if (this.state.password.length >= 6){
            if(this.state.confirm === this.state.password){
                this.setState({loading: true});
                let obj = {
                    password: this.state.password,
                    id: localStorage.getItem('id')
                };
                fetch('http://localhost:8000/api/v1/set-pass', {
                    method: 'POST',
                    body: JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({loading: false, redirect: true});
                })
                .catch(err => {
                    console.error(err);
                    this.setState({loading: false});
                })
            } else{
                this.setState({messages: 'Passwords are not the same'});
            }
        } else{
            this.setState({messages: 'Password is too small, it should be 6 or more chars'});
        }
    }

    redirect = () => {
        if (this.state.redirect){
            return <Redirect to='/logout' />
        }
    }

    render(){
        let button;
        if (this.state.loading){
            button = <button className='login-button' type="submit"><Loader /></button>
        } else{
            button = <button onClick={this.onSubmit} className='login-button' type="submit">Log In</button>
        }

        return (
            <div className="login-block">
                {this.redirect()}
                <div className={'login-form'}>
                    <h3 className="messages">{this.state.messages}</h3>
                    <div className="input-container">
                        <input onKeyPress={this.key} name="password" onChange={this.onChange} type="text" placeholder="Password"/>
                    </div>
                    <div className="input-container">
                        <input onKeyPress={this.key} name="confirm" onChange={this.onChange} type="password" placeholder="Confirm Password"/>
                    </div>
                    {button}
                </div>
            </div>
        );
    }
}

export default ChangePass;