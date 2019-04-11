import React from 'react';
import Loader from '../../Loader';
import { Redirect } from 'react-router-dom';

import ModalWindow from './ModalWindow/ModalWindow';

import cross_i from '../../../static/img/cross.svg';

import './EventsPage.css';

class EventPage extends React.Component {
  constructor(){
    super();
    this.state = {
      events: [],
      loading: true
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/events')
    .then(res => res.json())
    .then(data => {
      let events = [];
      data.map(event => {
        event.fields.id = event.pk;
        return (events.push(event.fields));
      });
      this.setState({ events, loading: false });
    })
    .catch(err => console.error(err))
  }

  delete = (key) => {
    let ask = window.confirm('Delete event?');
    if (ask){
      fetch(`http://localhost:8000/api/v1/delete-event/${key}`, {
        method: 'POST'
      })
      .then(res => res.json())
      .then(data => {
        this.setState({redirect: true});
      })
    }
  }

  redirect = () => {
    if (this.state.redirect){
      this.componentDidMount();
      this.setState({ redirect: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (<div className="soon-text"><Loader /></div>);
    } else{
      return (
        <div>
          <ModalWindow />
          <div className="event-block">
            {this.redirect()}
            {this.state.events.map(event => (
              <div key={event.id} className="card-event">
                <div className="delete-cross">
                  <img alt="Cross" src={cross_i} onClick={ () => this.delete(event.id) } style={{ 'width': '25px' }} />
                </div>
                <h2>{event.name}</h2>
                <p>Date: {new Date(event.start_time).toLocaleDateString('en-GB')}</p>
                <p>Start time: {new Date(event.start_time).toLocaleTimeString('en-GB').slice(0, -3)}</p>
                <p>End time: {new Date(event.end_time).toLocaleTimeString('en-GB').slice(0, -3)}</p>
                <p>Description: {event.description}</p>
                <div className="btn-event-block">
                  <button className="btn-event-take-part">Take part</button>
                  <button className="btn-event-take-part">Guests list</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}


export default EventPage;
