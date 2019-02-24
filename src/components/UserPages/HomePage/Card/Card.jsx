import React from 'react';

import './Card.css';

const Card = (props) => (
  <div key={props.id}>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
);

export default Card;
