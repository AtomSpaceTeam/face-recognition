import React from 'react';

import './SideBar.css';
import home_i from '../../static/img/home-user.svg';
import profile_i from '../../static/img/profile-user.svg';
import people_i from '../../static/img/people-user.svg';
import event_i from '../../static/img/events.svg';
import logout_i from '../../static/img/logout.svg';
import courses_i from '../../static/img/courses.svg';
import menu_h from '../../static/img/menu.svg';
import create_i from '../../static/img/create.svg';


import NavigationItems from './NavigationItems';

const items_all_admin = [
  { key: 1, icon: home_i, title: 'Home', path: '/home' },
  { key: 2, icon: profile_i, title: 'Profile', path: '/profile' },
  { key: 3, icon: people_i, title: 'Other people', path: '/people' },
  { key: 4, icon: event_i, title: 'Events', path: '/events' },
  { key: 5, icon: courses_i, title: 'Courses', path: '/courses' },
  { key: 6, icon: create_i, title: 'Create', path: '/create' },
]

const items_all = [
  { key: 1, icon: home_i, title: 'Home', path: '/home' },
  { key: 2, icon: profile_i, title: 'Profile', path: '/profile' },
  { key: 3, icon: people_i, title: 'Other people', path: '/people' },
  { key: 4, icon: event_i, title: 'Events', path: '/events' },
  { key: 5, icon: courses_i, title: 'Courses', path: '/courses' },
]

const items_logout = [
  { key: 1, icon: logout_i, title: 'Logout', path: '/logout' },
]

let onHam = false;

const change = () => {
  return (onHam = !onHam)
}

class SideBar extends React.Component {
  constructor(){
    super();
    this.state = {
      onHam: false,
      status: null
    }
  }

  change = () => {
    return (this.setState({onHam: !this.state.onHam}))
  }

  componentDidMount(){
    fetch('http://localhost:8000/check', {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('id'))
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'admin'){ this.setState({status: 1}) }
      else { this.setState({status: 0}) }
    })
    .catch(err => console.error(err));
  }

  render () {
    return (
      <div className="side-bar">
        <nav className="menu-h">
          <h3>Face recognition</h3>
          <img src={menu_h} style={{ width:"40px", padding:"2%", cursor:"pointer" }} onClick={this.change}/>
        </nav>
        <nav className="menu-mobile" style={this.state.onHam ? {'display': 'block', 'opacity': '0.95'} : {'display': 'none'}}>
          <ul>
            <NavigationItems style={{ opacity:"10" }} items={this.state.status === 1 ? items_all_admin : items_all} />
          </ul>
        </nav>
        <nav className="menu">
          <ul className="menu-all">
            <NavigationItems items={this.state.status === 1 ? items_all_admin : items_all} />
          </ul>
          <ul className="menu-logout">
            <NavigationItems items={items_logout} />
          </ul>
        </nav>
      </div>
    );
  }
}

export default SideBar;
