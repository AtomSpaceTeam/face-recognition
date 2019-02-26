import React from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(){
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: []
      },
      options:{
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/api-attendance')
    .then((res) => res)
    .then((data) => {
      console.log(data.json())
      let labels = [];
      let datasets = [{label: 'Attendance in this month', data:[]}];
      // for (let i in data){
      //   labels.push(i);
      //   datasets[0].data.push(data[i])
      // }
      // let chartData = {
      //   labels,
      //   datasets
      // };
      // chartData.datasets[0].backgroundColor = 'rgba(255,99,132,0.2)';
      // chartData.datasets[0].borderColor = 'rgba(255,99,132,1)';
      // chartData.datasets[0].borderColor = 'rgba(255,99,132,1)';
      // chartData.datasets[0].hoverBackgroundColor = 'rgba(255,99,132,0.4)';
      // chartData.datasets[0].hoverBorderColor = 'rgba(255,99,132,1)';
      // this.setState({chartData});
      // console.log(this.state.chartData);
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
        <Bar 
          data={this.state.chartData}
          options={this.state.options}
        />
    );
  }
}

export default Chart;
