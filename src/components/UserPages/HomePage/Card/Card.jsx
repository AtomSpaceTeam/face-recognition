import React from 'react';

import './Card.css';

<<<<<<< HEAD
const { card_list } = this.props;

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const Card = () => (
  {card_list.map(props => (
    <div key={props.id}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  ))}
=======
const Card = (props) => (
  <div key={props.id}>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
>>>>>>> cce100ba3f6486abc0a84d0fdbf691c69fc50526
);

export default Card;
