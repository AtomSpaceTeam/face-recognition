import React from 'react';

import './ProfilePage.css';

import avatar_i from '../../../static/img/man.svg';

const ProfilePage = () => (
  <div className="profile-block">
    <h2 className="profile-text-title">Profile</h2>
      <div className="profile-top">
        <div className="profile-left">
          <img src={avatar_i} style={{ width:"230px" }}/>
        </div>
        <div className="profile-right">
          <p>Name: Maxim</p>
          <p>Surname: Osadchiy</p>
          <p>Age: 16</p>
          <p>Status: resident</p>
          <p>Teams: Atom Team</p>
          <p>Projects: Face Recognition</p>
        </div>
      </div>
    <h2 className="profile-text-title">Your activity</h2>
      <div className="profile-bottom">
        <div className="active-block"></div>
      </div>
  </div>
);

export default ProfilePage;
