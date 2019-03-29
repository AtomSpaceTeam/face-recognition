import React from 'react';

import cross_i from '../../../static/img/cross.svg';

import './EventsPage.css';

class EventPage extends React.Component {
  constructor(){
    super();
    this.state = {
      events: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/events')
    .then(res => res.json())
    .then(data => {
      let events = [];
      data.map(event => {
        event.fields.id = event.pk
        events.push(event.fields)
      });
      this.setState({ events });
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="event-block">
        {this.state.events.map(event => (
          <div key={event.id} className="card-event">
          <div className="delete-cross">
            <img src={cross_i} style={{ 'width': '20px' }} />
          </div>
            <h2>{event.name}</h2>
            <p>Date: {new Date(event.start_time).toLocaleDateString('en-GB')}</p>
            <p>Start time: {new Date(event.start_time).toLocaleTimeString('en-GB')}</p>
            <p>End time: {new Date(event.end_time).toLocaleTimeString('en-GB')}</p>
            <p>Description: {event.description}</p>
            <div className="btn-event-block">
              <button className="btn-event-take-part">Take part</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}


export default EventPage;
