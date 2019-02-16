import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';

class Home extends Component {
  
  render() {
    return (
      <div className="Main">
        <h3 className='h3'>You are user!</h3>
      </div>
    );
  }
}

export default Home;
