import React from 'react';

class CreateUser extends React.Component{
	constructor(){
		super();
		this.state = {
			loading: false,
			user: {},
			type: 'text'
		}
	}

	onFocus = () => {
		this.setState({ type: 'date' })
	}

	onBlur = () => {
		this.setState({ type: 'text' })
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
				<div className="login-form-row">
					<div className="form-left">
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="Username"/>
						</div>
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="First Name"/>
						</div>
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="Last Name"/>
						</div>			
						<div className="input-container">
							<input onKeyPress={this.key} onFocus={ this.onFocus } onBlur={ this.onBlur }  type={this.state.type} placeholder="Birth Date"/>
						</div>
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="E-mail"/>
						</div>
					</div>
					<div className="form-right">
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="Team"/>
						</div>
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="Project"/>
						</div>
						<div className="input-container">
							<input onKeyPress={this.key} type="text" placeholder="Photo"/>
						</div>
						<div className="input-container">
							<select onKeyPress={this.key} type="text" placeholder="Status">
								<option value="" disabled selected>Select your option</option>
								<option value="resident">Resident</option>
								<option value="mentor">Mentor</option>
							</select>
						</div>
						<div className="input-container">
							<select onKeyPress={this.key} type="text" placeholder="Specialisation"></select>
						</div>
					</div>
				</div>
				{button}
			</div>
		);
	}
}

export default CreateUser;