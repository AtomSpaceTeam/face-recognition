import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import './HomeUser.css';
import team_i from '../../../../static/img/teams.svg';

class HomeUser extends Component {
  render() {
    return (
      <div className="home-block">
        <div className="card-container">
          <div className="row" style={{ padding:"1%" }}>
            <div className="col-sm card card-text">
              <div className="row">
                <div className="col-sm">
                  <img src={team_i} style={{ width:"80px" }} />
                </div>
                <div className="col-sm">
                  <h2>0</h2>
                  <h4>Teams</h4>
                </div>
              </div>
            </div>
            <div className="col-sm card card-text">
              <div className="row">
                <div className="col-sm">
                  <img src={team_i} style={{ width:"80px" }} />
                </div>
                <div className="col-sm">
                  <h2>0</h2>
                  <h4>Projects</h4>
                </div>
              </div>
            </div>
            <div className="col-sm card card-text">
              <div className="row">
                <div className="col-sm">
                  <img src={team_i} style={{ width:"80px" }} />
                </div>
                <div className="col-sm">
                  <h2>0</h2>
                  <h4>Members</h4>
                </div>
              </div>
            </div>
              <div className="col-sm card card-text" style={{ marginBottom:"10px" }}>
                <div className="row">
                  <div className="col-sm">
                    <img src={team_i} style={{ width:"80px" }} />
                  </div>
                  <div className="col-sm">
                    <h2>0</h2>
                    <h4>Teams</h4>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeUser;
