import React from 'react';
import Card from './Card';
import Chart from './Chart/Chart';

import './HomePage.css';


class HomePage extends React.Component{
  constructor(){
    super();
    this.state = {
      cards:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/count')
    .then((res) => res.json())
    .then((data) => {
      let cards = [
        { id: 1, number: data.teams, title: 'Teams' },
        { id: 2, number: data.projects, title: 'Projects' },
        { id: 3, number: data.residents, title: 'Residents' },
        { id: 4, number: data.mentors, title: 'Mentors' }
      ];
      this.setState({cards})
    })
    .catch((err) => console.error(err))
  }

  render(){
    let {cards} = this.state;
    let cardList = [];
    cards.map(item => cardList.push(<Card key={item.id} number={item.number} title={item.title} />))
    return (
      <div className="home-page">
        <div className="card">
          {cardList}
        </div>
        <div className="chart">
          <Chart />
        </div>
      </div>
    )
  }
}

export default HomePage;
