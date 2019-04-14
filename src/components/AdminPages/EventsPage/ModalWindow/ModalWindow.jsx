import React from 'react';

import cross_i from '../../../../static/img/cross.svg';

import './ModalWindow.css';

class ModalWindow extends React.Component {
  constructor(){
    super();
    this.state = {
      guests: []
    };
  }

  componentDidMount(){
    fetch(`http://localhost:8000/api/v1/get-guests/${this.props.event_id}`)
    .then(res => res.json())
    .then(data => this.setState({ guests: data }))
    .catch(err => console.error(err))
  }
  
  render () {
    return(
      <div>
        <div className="modal-window">
          <div className="modal-block">
            <div style={this.state.guests.length > 1 ? {overflowY: 'scroll'} : {}} className="people">
              {this.state.guests.map(guest => (
                <div key={guest.pk} className="person">
                  <div className="col-1">
                    <div className="photo"><img src={'http://localhost:8000/media/'+guest.fields.photo} alt=""/></div>
                  </div>
                  <div className="col-2">
                    <div className="name">Name: {guest.fields.name+' '+guest.fields.surname}</div>
                    <br/>
                    <div className="descr">E-mail: {guest.fields.email}</div>
                  </div>
                </div>
              ))}
              {/* <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div>
              <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div>
              <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div>
              <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div>
              <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div> */}
              {/* <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div>
              <div className="person">
                <div className="col-1">
                  <div className="photo">Photo</div>
                  <div className="name">Name</div>
                </div>
                <div className="descr">Description</div>
              </div> */}
            </div>
            <div className="close-cross">
              <img alt="Cross" onClick={this.props.close} src={cross_i} style={{ 'width': '25px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
