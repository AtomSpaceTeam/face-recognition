import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Form.css'

class Form extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            messages: '',
            redirect: false
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
                let reg = new RegExp('admin');
                if (reg.test(user.user_id)){
                    console.log('You are amdin');
                    localStorage.setItem('status', 'admin')
                    localStorage.setItem('id', user.user_id)
                    this.setState({redirect: true})
                }
                else{
                    console.log('You are common user')
                    localStorage.setItem('status', 'user')
                    localStorage.setItem('id', user.user_id)
                    this.setState({redirect: true})
                }
            })
            .catch((err) => err);
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
        return (
            <div className={'App ' + this.props.class}>
                {this.redirect()}
                    <h3 className="messages">{this.state.messages}</h3>
                    <div className="input-container">
                        <input onChange={this.UsernameChange} type="text" placeholder="Username"/>
                        <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                    </div>
                    <div className="input-container">
                        <input onChange={this.PasswordChange} type="password" placeholder="Password"/>
                        <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                    </div>
                    <button onClick={this.onSubmit} className='login-button' type="submit">Log In</button>
                {/* </form> */}
            </div>
        );
    }
}

export default Form;