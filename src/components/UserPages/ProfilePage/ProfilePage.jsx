import React from 'react';

import './ProfilePage.css';

import avatar_i from '../../../static/img/man.svg';

class ProfilePage extends React.Component{
  constructor(){
    super();
    this.state = {
      user: {}
    }
  }

  countAge = (birth) => {
    let now = new Date()
    let diff = now - birth
    diff = new Date(diff).getFullYear()
    return (diff - 1970);
  }
  
  componentDidMount(){
    fetch('http://localhost:8000/user-info', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({'name': localStorage.getItem('user.name')})
    })
    .then(res => res.json())
    .then(data => {
      let {name, surname, birth_date, status, team, project} = data[0].fields;
      let age = this.countAge(new Date(birth_date));
      this.setState({
        user: {
          name,
          surname,
          age,
          status,
          team,
          project
        }
      });
    })
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="profile-block">
        <h2 className="profile-text-title">Profile</h2>
          <div className="profile-top">
            <div className="profile-left">
              <img src={avatar_i} style={{ width:"230px" }}/>
            </div>
            <div className="profile-right">
              <p>Name: {this.state.user.name}</p>
              <p>Surname: {this.state.user.surname}</p>
              <p>Age: {this.state.user.age}</p>
              <p>Status: {this.state.user.status}</p>
              <p>Team: {this.state.user.team}</p>
              <p>Project: {this.state.user.project}</p>
            </div>
          </div>
        <h2 className="profile-text-title">Your activity</h2>
          <div className="profile-bottom">
            <div className="active-block"></div>
          </div>
      </div>
    );
  }
}

export default ProfilePage;
