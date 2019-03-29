import React from 'react';

import HomeAdmin from '../components/AdminPages';
import UserPages from '../components/UserPages';
import Loader from '../components/Loader';
import ChangePass from '../components/ChangePass/ChangePass';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      status: null,
      loading: true
    };
  }

  componentDidMount(){
    fetch('http://localhost:8000/check', {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('id'))
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'admin'){ this.setState({status: 1, loading: false}); }
      else { this.setState({status: 0, loading: false}) }
    })
    .catch(err => console.error(err));
  }

  render() {
    let component;
   
    if (this.state.loading){
      component = <div className="soon-text"><Loader /></div>
    } else if(localStorage.getItem('password')) {
      component = <ChangePass />
    }
    else{
      if (this.state.status === 1) {
        component = <HomeAdmin />
      } else {
        component = <UserPages />
      }
    }
    return component;
  }
}

export default Home;
