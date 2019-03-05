import React from 'react';

import './Card.css';
import team_i from '../../../../static/img/team.svg';

const Card = (props) => (
  <div className="card-block" key={props.id}>
    <div className="card-left">
      <img src={team_i}  style={{ width:"80px", marginTop: "10px" }} />
    </div>
    <div className="card-right">
      <h3 className="title-text">{props.number}</h3>
      <p className="card-text">{props.title}</p>
    </div>
  </div>
);

export default Card;
