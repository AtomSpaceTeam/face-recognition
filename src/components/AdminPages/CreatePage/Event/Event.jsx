import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateEvent extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            redirect: false,
            event: {
                name: '',
                description: '',
                organizer: '',
                start_time: '',
                end_time: ''
            },
            type1: 'text',
            type2: 'text',
            messages: ''
        }
    }

    redirect = () => {
        if (this.state.redirect){
            return <Redirect to='/' />
        }
    }

    onSubmit = () => {
        console.log(this.state.event);
        for(let i in this.state.event){
            if (this.state.event[i] === ''){
                this.setState({ all_filled: false, messages: 'You have not filled all fields in' })
                return 0;
            } else{
                continue;
            }
        }
        this.setState({ loading: true });
        let form = new FormData();
        for(let i in this.state.event) {form.append(i, this.state.event[i]);}
        fetch('http://localhost:8000/api/create-event', {
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
    }

    onChangeType1 = (e) => {
        e.target.type === 'text' ? this.setState({ type1: 'datetime-local' }) : this.setState({ type1: 'text' });
    }

    onChangeType2 = (e) => {
		e.target.type === 'text' ? this.setState({ type2: 'datetime-local' }) : this.setState({ type2: 'text' });
    }

    onChange = (e) => {
		this.setState({ messages: '', all_filled: true });
		let obj = this.state.event;
		let key = e.target.name;
        let user = Object.assign(obj, {[key]: e.target.value});
		this.setState({ user });
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
			button = <button className='create-btn' type="submit">{this.props.loader}</button>
		} else{
			button = <button onClick={this.onSubmit} className='create-btn' type="submit">Create</button>
		}
		return (
			<div className={'create-form'}>
				<h2 style={{ 'marginBottom': '0' }}>Create new event</h2>
				<h3 className="messages">{this.state.messages}</h3>
				{ this.redirect() }
				<div className="login-form-row">
					<div className="form-left">
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="name" type="text" placeholder="Name" />
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} type="text" name="organizer" placeholder="Organizer" />
						</div>
						<div className="input-container">
							<textarea onChange={ this.onChange } onKeyPress={this.key} type="text" name="description" placeholder="Description"></textarea>
						</div>
						<div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="start_time" onFocus={ this.onChangeType1 } onBlur={ this.onChangeType1 } type={this.state.type1} placeholder="Start time" />
						</div>
                        <div className="input-container">
							<input onChange={ this.onChange } onKeyPress={this.key} name="end_time" onFocus={ this.onChangeType2 } onBlur={ this.onChangeType2 } type={this.state.type2} placeholder="End time" />
						</div>
					</div>
				</div>
				{button}
			</div>
		);
	}
}

export default CreateEvent;
