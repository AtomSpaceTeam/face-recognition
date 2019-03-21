import React from 'react';

import './PeoplePage.css';

class PeoplePage extends React.Component{
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/users')
    .then(res => {
      return(res.json());
    })
    .then(data => {
      let users = [];
      data.map(user => {
        users.push(user.fields);
      })
      for(let i in users) {
        if(users[i].name === localStorage.getItem('user.name')) users.splice(i, 1)
      }
      this.setState({ users });
    })
    .catch(err => console.log(err))
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
