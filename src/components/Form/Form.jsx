import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Form.css';

class Form extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            messages: '',
            redirect: false,
            loading: false
            // password2: '',
            // firstName: '',
            // lastName: '',
            // email: '',
            // bitrhDate: '',
            // spec: '',
            // team: '',
            // project: '',
            // passwordReg: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
            // goodPassword: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.UsernameChange = this.UsernameChange.bind(this);
        this.PasswordChange = this.PasswordChange.bind(this);
    }

    onSubmit(){
        if (this.state.username.length >= 4 && this.state.password.length >= 8){
            this.setState({loading: true});
            var obj = {
                username: this.state.username,
                password: this.state.password
            }
            let headers = new Headers({
                'Content-Type': 'application/json'
            });
            fetch("http://localhost:8000/api/login",{
                method: 'POST',
                headers: headers,
                body: JSON.stringify(obj)
            })
            .then((res) => {
                return res.json();
            })
            .then((user) =>{
                if (user.status !== 200){
                    this.setState({messages: user.message})
                    return 0;
                }
                let reg = new RegExp('admin');
                let userObject = JSON.parse(user.user)[0].fields
                console.log(userObject);
                if (reg.test(user.user_id)){
                    console.log('You are amdin');
                    localStorage.setItem('status', 'admin');
                    localStorage.setItem('id', user.user_id);
                    localStorage.setItem('user.name', userObject.birth_date);
                    this.setState({redirect: true, loading: false});
                }
                else{
                    console.log('You are common user');
                    localStorage.setItem('status', 'user');
                    localStorage.setItem('id', user.user_id);
                    localStorage.setItem('user', userObject);
                    this.setState({redirect: true, loading: false});
                }
            })
            .catch((err) => {
                this.setState({messages: 'Some troubles with server, please try again later', loading: false});
            });
        }
        else{
            this.setState({messages: 'Invalid login or password'});
        }
    }
    redirect(){
        if (this.state.redirect){
            return <Redirect to='/'/>
        }
    }

    UsernameChange(e){
        this.setState({messages: ''});
        this.setState({username: e.target.value});
    }

    PasswordChange(e){
        this.setState({messages: ''});
        this.setState({password: e.target.value});
    }

    render(){
        let button;
        if (this.state.loading){
            button = <button onClick={this.onSubmit} className='login-button' type="submit"><Loader /></button>
        } else{
            button = <button onClick={this.onSubmit} className='login-button' type="submit">Log In</button>
        }

        return (
            <div className="login-block">
                <div className={'login-form ' + this.props.class}>
                    {this.redirect()}
                        <h3 className="messages">{this.state.messages}</h3>
                        <div className="input-container">
                            <input onChange={this.UsernameChange} type="text" placeholder="Username"/>
                        </div>
                        <div className="input-container">
                            <input onChange={this.PasswordChange} type="password" placeholder="Password"/>
                        </div>
                        {button}
                </div>
            </div>
        );
    }
}

export default Form;
