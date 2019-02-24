import React from 'react';
import Card from './Card';

import './HomePage.css';
import team_i from '../../../static/img/teams.svg';


const cards = [
  { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
  { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];

const CardsList = () => (
  cards.map(card => (
    <Card key={card.id} title={card.title} content={card.content} />
  ))
);

const HomePage = () => (
  <div className="home-page">
    <h3>Home Page</h3>
    <CardsList />
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
