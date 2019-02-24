import React from 'react';

import './SideBar.css';
import home_i from '../../static/img/home-user.svg';
import profile_i from '../../static/img/profile-user.svg';
import people_i from '../../static/img/people-user.svg';
import event_i from '../../static/img/events.svg';
import logout_i from '../../static/img/logout.svg';

const SideBar = () => (
  <div className="side-bar">
    <div className="menu">
      <div className="btn-block">
        <a href="/" className="btn">
          <img src={home_i} style={{ width:"20%", padding: "10px", height: "50px" }}/>
          <p>Home</p>
        </a>
      </div>
      <div className="btn-block">
        <a href="/" className="btn">
          <img src={profile_i} style={{ width:"20%", padding: "10px", height: "50px" }}/>
          <p>Profile</p>
        </a>
      </div>
      <div className="btn-block">
        <a href="/" className="btn">
          <img src={people_i} style={{ width:"20%", padding: "10px", height: "50px" }}/>
          <p>Other people</p>
        </a>
      </div>
      <div className="btn-block">
        <a href="/" className="btn">
          <img src={event_i} style={{ width:"20%", padding: "10px", height: "50px" }}/>
          <p>Events</p>
        </a>
      </div>
      <div className="btn-block">
        <a href="/" className="btn">
          <img src={logout_i} style={{ width:"20%", padding: "10px", height: "50px" }}/>
          <p>Logout</p>
        </a>
      </div>
    </div>
  </div>
);

export default SideBar;
