import React from 'react';

import './Card.css';

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const Card = (props) => (
  <div key={props.id}>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
);

export default Card;
