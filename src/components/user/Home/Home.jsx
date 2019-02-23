import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import MainBlock from '../MainBlock/MainBlock';
import SideBar from '../SideBar/SideBar';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Home.css';
import '../../../static/css/bootstrap.min.css';


class Home extends Component {

  render() {
    return (
      <div className='container-fluid user-container-block'>
        <div className="row">
          <SideBar/>
          <MainBlock/>
        </div>
      </div>
    );
  }
}

export default Home;
