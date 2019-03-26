import React from 'react';

import HomeAdmin from '../components/AdminPages';
import UserPages from '../components/UserPages';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      status: null
    };
  }

  componentDidMount(){
    fetch('http://localhost:8000/check', {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('id'))
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'admin'){ this.setState({status: 1}); }
      else { this.setState({status: 0}) }
    })
    .catch(err => console.error(err));
  }

  render() {
    let component;
   
    if (this.state.status === 1) {
      component = <HomeAdmin />
    } else {
      component = <UserPages />
    }
    return component;
  }
}

export default Home;
