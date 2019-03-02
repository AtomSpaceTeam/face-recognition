import React from 'react';

import './SideBar.css';
import home_i from '../../static/img/home-user.svg';
import profile_i from '../../static/img/profile-user.svg';
import people_i from '../../static/img/people-user.svg';
import event_i from '../../static/img/events.svg';
import logout_i from '../../static/img/logout.svg';
import courses_i from '../../static/img/courses.svg';
import menu_h from '../../static/img/menu.svg';


import NavigationItems from './NavigationItems';

const items = [
  { key: 1, icon: home_i, title: 'Home', path: '/home' },
  { key: 2, icon: profile_i, title: 'Profile', path: '/profile' },
  { key: 3, icon: people_i, title: 'Other people', path: '/people' },
  { key: 4, icon: event_i, title: 'Events', path: '/events' },
  { key: 5, icon: courses_i, title: 'Courses', path: '/courses' },
  { key: 6, icon: logout_i, title: 'Logout', path: '/logout' },

]

let onHam = false;

const change = () => {
  return (onHam = !onHam)
}

class SideBar extends React.Component {
  constructor(){
    super();
    this.state = {
      onHam: false
    }
  }

  change = () => {
    return (this.setState({onHam: !this.state.onHam}))
  }

  render () {
    return (
      <div className="side-bar">
        <nav className="menu-h">
          <img src={menu_h} style={{ width:"40px", padding:"2%", cursor:"pointer" }} onClick={this.change}/>
        </nav>
        <nav className="menu-mobile" style={this.state.onHam ? {'display': 'block'} : {'display': 'none'}}>
          <NavigationItems style={{ opacity:"10" }} items={items} />
        </nav>
        <nav className="menu">
          <NavigationItems items={items} />
        </nav>
      </div>
    );
  }
}

export default SideBar;
