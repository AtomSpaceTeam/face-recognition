import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './SideBar.css';
import '../../../static/css/bootstrap.min.css';

import home_i from '../../../static/img/home-user.svg';
import profile_i from '../../../static/img/profile-user.svg';
import people_i from '../../../static/img/people-user.svg';
import event_i from '../../../static/img/events.svg';
import logout_i from '../../../static/img/logout.svg';

class SideBar extends Component {
  render() {
    return(
    <SideNav
        onSelect={(selected) => {
            // Add your code here
        }}
    >
      <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                    <img src={home_i} style={{ width: '50%' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="profile">
                <NavIcon>
                    <img src={profile_i} style={{ width: '50%' }} />
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
            </NavItem>
            <NavItem eventKey="other_people">
                <NavIcon>
                    <img src={people_i} style={{ width: '50%' }} />
                </NavIcon>
                <NavText>
                    Other People
                </NavText>
            </NavItem>
            <NavItem eventKey="events">
                <NavIcon>
                    <img src={event_i} style={{ width: '50%' }} />
                </NavIcon>
                <NavText>
                    Events
                </NavText>
            </NavItem>
            <NavItem eventKey="logout">
                <NavIcon>
                    <img src={logout_i} style={{ width: '50%' }} />
                </NavIcon>
                <NavText>
                    Log out
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
    );
  }
}

export default SideBar;
