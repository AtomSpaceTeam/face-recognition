import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HomeUser from './HomeUser/HomeUser';
import ProfileUser from './ProfileUser/ProfileUser';
import PeopleUser from './PeopleUser/PeopleUser';
import EventUser from './EventUser/EventUser';

import './MainBlock.css';
import '../../../static/css/bootstrap.min.css';
import '../../../static/css/bootstrap.css';

class MainBlock extends Component {
  render() {
    return(
      <div className="main-block">
        <HomeUser />
      </div>
    );
  }
}

export default MainBlock;
