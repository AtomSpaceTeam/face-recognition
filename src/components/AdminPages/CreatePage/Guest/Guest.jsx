import React from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../../../Loader';

class CreateGuest extends React.Component{
	constructor(){
		super();
		this.state = {
			loading: false,
			redirect: false,
			all_filled: true,
			guest: {
				first_name: '',
				last_name: '',
				email: '',
				photo: '',
				event: ''
			},
			typeDate: 'text',
			messages: '',
			events: []
		}
	}

	componentDidMount(){
		this.setState({ loading: true });
		fetch('http://localhost:8000/api/v1/get-events')
		.then(res => res.json())
		.then(data => {
		let events = [];
		data.map(event => {
			event.fields.id = event.pk;
			events.push(event.fields);
		});
		let guest = {...this.state.guest};
		guest.event = events[0].name;
		this.setState({ events, loading: false, guest });
		})
		.catch(err => console.error(err))
	}

	onChangeType = (e) => {
		e.target.type === 'text' ? this.setState({ typeDate: 'date' }) : this.setState({ typeDate: 'text' });
	}

	onSubmit = () => {
		for(let i in this.state.guest){
			if (this.state.guest[i] === ''){
				this.setState({ all_filled: false, messages: 'You have not filled all fields in'})
				return 0;
			} else{
				continue;
			}
		}
		this.setState({ loadingButton: true });
		let form = new FormData();
		for(let i in this.state.guest) {form.append(i, this.state.guest[i]);}
		fetch('http://localhost:8000/api/v1/create-guest', {
			method: 'POST',
			body: form
		})
		.then(res => res.json())
		.then(data => {
			if (data.status === 200){
				this.setState({ loadingButton: false, redirect: true });
			} else{
				this.setState({ messages: 'There is some troubles with server, please try again later', loadingButton: false });
			}
		})
		.catch(err => console.error(err));
	}

	onChange = (e) => {
		this.setState({ messages: '', all_filled: true });
		let obj = this.state.guest;
		let key = e.target.name;
		let guest = Object.assign(obj, {[key]: e.target.value});
		this.setState({ guest });
	}

	photo = (e) => {
		let guest = {...this.state.guest};
		guest.photo = e.target.files[0];
		this.setState({ guest });
	}

	key = (e) => {
        if (e.key === 'Enter'){
            console.log(this.onSubmit());
        }
	}

	redirect = () => {
		if (this.state.redirect){
			return <Redirect to="/events"/>
		}
	}

	render() {
		let button;
		if (this.state.loading){
			return (<div className="soon-text"><Loader /></div>);
		} else{
			if (this.state.loadingButton) {
				button = <button className='create-btn' type="submit">{this.props.loader}</button>
			} else{
				button = <button onClick={this.onSubmit} className='create-btn' type="submit">Create</button>
			}
			return (
				<div className={'create-form'}>
					<h2 style={{ 'marginBottom': '0' }}>Create new guest</h2>
					<h3 className="messages">{this.state.messages}</h3>
					{ this.redirect() }
					<div className="login-form-row">
						<div className="form-left">
							<div className="input-container">
								<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="first_name" placeholder="First Name" />
							</div>
							<div className="input-container">
								<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="last_name" placeholder="Last Name" />
							</div>
							<div className="input-container">
								<input onChange={ this.onChange } onKeyPress={this.key} name="email" type="text" placeholder="E-mail" />
							</div>
							<div className="input-container">
								<input onChange={ this.photo } className="" type="file" placeholder="Photo" />
							</div>
							<div className="input-container select-tag">
								<label htmlFor="select-spec">Event</label>
								<select onChange={ this.onChange } className="select" id="select-spec" name="event" >
									<option className="option" value="" defaultValue disabled>Select your event</option>
									{ this.state.events.map(event => (<option className='option' key={event.id} value={event.name}>{event.name}</option>)) }
								</select>
							</div>
						</div>
					</div>
					{button}
				</div>
			);
		}
	}
}

export default CreateGuest;
