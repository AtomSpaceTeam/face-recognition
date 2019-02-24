import React from 'react';
import Card from './Card';

import './HomePage.css';
import team_i from '../../../static/img/teams.svg';


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
      1
    </div>
  </div>
);

    // return (
    //   <div className="home-block">
    //     <div className="card-container">
    //       <div className="row" style={{ padding:"1%" }}>
    //         <div className="col-sm card card-text">
    //           <div className="row">
    //             <div className="col-sm">
    //               <img src={team_i} style={{ width:"80px" }} />
    //             </div>
    //             <div className="col-sm">
    //               <h2>0</h2>
    //               <h4>Teams</h4>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-sm card card-text">
    //           <div className="row">
    //             <div className="col-sm">
    //               <img src={team_i} style={{ width:"80px" }} />
    //             </div>
    //             <div className="col-sm">
    //               <h2>0</h2>
    //               <h4>Projects</h4>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-sm card card-text">
    //           <div className="row">
    //             <div className="col-sm">
    //               <img src={team_i} style={{ width:"80px" }} />
    //             </div>
    //             <div className="col-sm">
    //               <h2>0</h2>
    //               <h4>Members</h4>
    //             </div>
    //           </div>
    //         </div>
    //           <div className="col-sm card card-text" style={{ marginBottom:"10px" }}>
    //             <div className="row">
    //               <div className="col-sm">
    //                 <img src={team_i} style={{ width:"80px" }} />
    //               </div>
    //               <div className="col-sm">
    //                 <h2>0</h2>
    //                 <h4>Teams</h4>
    //               </div>
    //             </div>
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    // );
//   }
// }

export default HomePage;
