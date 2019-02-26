import React from 'react';

import './SideBar.css';
import home_i from '../../static/img/home-user.svg';
import profile_i from '../../static/img/profile-user.svg';
import people_i from '../../static/img/people-user.svg';
import event_i from '../../static/img/events.svg';
import logout_i from '../../static/img/logout.svg';
import courses_i from '../../static/img/courses.svg';


import NavigationItems from './NavigationItems';

const items = [
  { icon: home_i, title: 'Home', path: '/' },
  { icon: profile_i, title: 'Profile', path: '/profile' },
  { icon: people_i, title: 'Other people', path: '/people' },
  { icon: event_i, title: 'Events', path: '/events' },
  { icon: courses_i, title: 'Courses', path: '/courses' },
  { icon: logout_i, title: 'Logout', path: '/logout' },

]

const SideBar = () => (
  <div className="side-bar">
    <nav className="menu">
      <NavigationItems items={items} />
    </nav>
  </div>
);

export default SideBar;
