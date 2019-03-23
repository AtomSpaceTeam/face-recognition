import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateUser extends React.Component{
	constructor(){
		super();
		this.state = {
			loading: false,
			redirect: false,
			all_filled: true,
			user: {
				username: '',
				first_name: '',
				last_name: '',
				date: '',
				email: '',
				team: '',
				project: '',
				status: 'resident',
				specialisation: 'designer',
				photo: ''
			},
			usernames: [],
			typeDate: 'text',
			messages: ''
		}
	}

	componentDidMount(){
		fetch('http://localhost:8000/get-usernames')
		.then(res => res.json())
		.then(data => {
			this.setState({ usernames: data.usernames })
		})
		.catch(err => console.error(err));
	}

	onChangeType = (e) => {
		e.target.type === 'text' ? this.setState({ typeDate: 'date' }) : this.setState({ typeDate: 'text' });
	}

	onSubmit = () => {
		if(!this.state.usernames.includes(this.state.user.username) && this.state.user.username.length >= 4){
			if(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(this.state.user.email)){
				for(let i in this.state.user){
					if (this.state.user[i] === ''){
						this.setState({ all_filled: false, messages: 'You have not filled all fields in'})
						return 0;
					} else{
						continue;
					}
				}
				this.setState({ loading: true });
				let form = new FormData();
				for(let i in this.state.user) {form.append(i, this.state.user[i]);}
				fetch('http://localhost:8000/api/create-user', {
					method: 'POST',
					body: form
				})
				.then(res => res.json())
				.then(data => {
					if (data.status === 200){
						this.setState({ loading: false, redirect: true });
					} else{
						this.setState({ messages: 'There is some troubles with server, please try again later'});
					}
				})
				.catch(err => console.error(err));
			} else{
				this.setState({ messages: 'You have entered irregular e-mail address'});
			}
		} else{
			this.setState({ messages: 'This username is less than 4 chars or already exist'});
		}
	}

	onChange = (e) => {
		this.setState({ messages: '', all_filled: true });
		let obj = this.state.user;
		let key = e.target.name;
		let user = Object.assign(obj, {[key]: e.target.value});
		this.setState({ user });
	}

	photo = (e) => {
		let user = {...this.state.user};
		user.photo = e.target.files[0];
		this.setState({ user });
	}

	key = (e) => {
        if (e.key === 'Enter'){
            console.log(this.onSubmit());
        }
	}
	
	redirect = () => {
		if (this.state.redirect){
			return <Redirect to="/people"/>
		}
	}

	render() {
		let button;
		if (this.state.loading){
			button = <button className='login-button' type="submit">{this.props.loader}</button>
		} else{
			button = <button onClick={this.onSubmit} className='login-button' type="submit">Log In</button>
		}	
		return (
			<div className={'create-form'}>
				<h2>Create new user</h2>
				<h3 className="messages">{this.state.messages}</h3>
				{ this.redirect() }
				<div className="login-form-row">
					<div className="form-left">
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="username" type="text" placeholder="Username" />
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="first_name" placeholder="First Name" />
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="last_name" placeholder="Last Name" />
						</div>			
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="date" onFocus={ this.onChangeType } onBlur={ this.onChangeType } type={this.state.typeDate} placeholder="Birth Date" />
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="email" type="text" placeholder="E-mail" />
						</div>
					</div>
					<div className="form-right">
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="team" placeholder="Team" />
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="project" placeholder="Project" />
						</div>
						<div className="input-container">
							<input onChange={ this.photo } onKeyPress={this.key} className="" type="file" placeholder="Photo" />
						</div>
						<div className="input-container select-tag">
							<label htmlFor="select-status">Status</label>
							<select onChange={ this.onChange } className="select" id="select-status" onKeyPress={this.key} name="status" >
								<option value=""  disabled>Select your option</option>
								<option defaultValue value="resident">Resident</option>
								<option value="mentor">Mentor</option>
							</select>
						</div>
						<div className="input-container select-tag">
							<label htmlFor="select-spec">Specialisation</label>
							<select onChange={ this.onChange } className="select" id="select-spec" onKeyPress={this.key} name="specialisation" >
								<option value="" defaultValue disabled>Select your option</option>
								<option value="designer">Designer</option>
								<option value="back-end">Back-End</option>
								<option value="front-end">Front-End</option>
								<option value="software engineer">Software Engineer</option>
								<option value="QA">QA</option>
							</select>
						</div>
					</div>
				</div>
				{button}
			</div>
		);
	}
}

export default CreateUser;