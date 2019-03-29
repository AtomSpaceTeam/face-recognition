import React from 'react';
import Loader from '../../Loader';

import './PeoplePage.css';

class PeoplePage extends React.Component{
  constructor(){
    super();
    this.state = {
      users: [],
      loading: true
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('id'))
    })
    .then(res => res.json())
    .then(data => {
      let users = [];
      data.map(user => {
        users.push(user.fields);
      })
      this.setState({ users, loading: false });
    })
    .catch(err => console.error(err))
  }

  delete = (key) => {
    let item = this.state.users[key].surname;
    fetch(`http://localhost:8000/api/v1/delete-user/${item}`, {
      method: 'POST'
    })
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  render(){
    if (this.state.loading){
      return (<div className="soon-text"><Loader /></div>);
    } else{
      return (
        <div className="people-block">
          {this.state.users.map((user, id) => (
          <div key={id} className="card-people">
            <h3>{`${user.name} ${user.surname}`}</h3>
            <p>Status: {user.status}</p>
            <p>Team: {user.team}</p>
            <p>Projects: {user.project}</p>
            <div className="card-btn-block">
              <button key={ id } onClick={ () => this.delete(id) } className="card-btn-delete">Delete</button>
            </div>
          </div>
          ))}
        </div>
      );
    }
  }
}

export default PeoplePage;
