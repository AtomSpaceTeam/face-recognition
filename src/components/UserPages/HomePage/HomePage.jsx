import React from 'react';
import Card from './Card';
import Chart from './Chart/Chart';

import './HomePage.css';


const cards = [
  { id: 1, number: '0', title: 'Teams' },
  { id: 2, number: '0', title: 'Projects' },
  { id: 3, number: '0', title: 'Residents' },
  { id: 4, number: '0', title: 'Mentors' }
];

const CardsList = () => (
  cards.map(card => (
    <Card key={card.id} number={card.number} title={card.title} />
  ))
);

const HomePage = () => (
  <div className="home-page">
    <div className="card">
      <CardsList />
    </div>
    <div className="chart">
      <Chart />
    </div>
  </div>
);

export default HomePage;
