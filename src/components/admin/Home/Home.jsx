import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {Bar} from 'react-chartjs-2';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: []
      }
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/admin-attendance')
    .then((res) => res.json())
    .then((data) => {
      let labels = [];
      let datasets = [{label: 'Attendance in this month', data:[]}];
      labels = [...data]
      console.log(labels)
    })
    .catch((err) => console.log(err))
  }

  render() {
    // fetch('http://localhost:8000/api/admin-attendance')
    // .then((res) => res.json())
    // .then((data) => {
    //   let ctx = document.getElementById('admin-attendance');
    //   let myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: '',
    //       datasets: [{
    //         label: "Attendance in this month",
    //         borderColor: 'rgb(255, 99, 132)',
    //         data: 'data'
    //       }]
    //     }
    //   });
    //   console.log(data)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })

  //   var chart = new Chart(ctx, {
  //     // The type of chart we want to create
  //     type: 'line',

  //     // The data for our dataset
  //     data: {
  //         labels: names,
  //         datasets: [{
  //             label: "Attendance in this month",
  //             borderColor: 'rgb(255, 99, 132)',
  //             data: data,
  //         }]
  //     },

  //     // Configuration options go here
  //     options: {}
  // });

    return (
      <div className="Main">
        <h3 className='h3'>You are admin!</h3>
        <Bar 
          data={this.state.chartData}
        />
        <button onClick={this.chartData}>Get</button>
      </div>
    );
  }
}

export default Home;
