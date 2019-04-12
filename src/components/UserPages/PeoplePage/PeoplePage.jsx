import React from 'react';

// import cross_i from '../../../static/img/cross.svg';

import './PeoplePage.css';

class PeoplePage extends React.Component{
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('id'))
    })
    .then(res => res.json())
    .then(data => {
      let users = [];
      data.map(user => users.push(user.fields))
      this.setState({ users });
    })
    .catch(err => console.error(err))
  }

  render(){
    return (
      <div className="people-block">
        {this.state.users.map((user, id) => (
        <div key={id} className="card-people">
          <h3>{`${user.name} ${user.surname}`}</h3>
          <p>Status: {user.status}</p>
          <p>Team: {user.team}</p>
          <p>Projects: {user.project}</p>
        </div>
        ))}
      </div>
    );
  }
}

export default PeoplePage;
