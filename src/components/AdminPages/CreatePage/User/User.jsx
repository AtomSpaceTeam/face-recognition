import React from 'react';

class CreateUser extends React.Component{
	constructor(){
		super();
		this.state = {
			loading: false
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
			<div className={'login-form ' + this.props.class}>
				<h2>Create new user</h2>
				<div className="input-container">
					<input onKeyPress={this.key} onChange={this.UsernameChange} type="text" placeholder="Username"/>
				</div>
				<div className="input-container">
					<input onKeyPress={this.key} onChange={this.PasswordChange} type="password" placeholder="Password"/>
				</div>
				{button}
			</div>
		);
	}
}

export default CreateUser;