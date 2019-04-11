import React from 'react';

import cross_i from '../../../../static/img/cross.svg';

import './ModalWindow.css';

class ModalWindow extends React.Component {
  render () {
    return(
      <div>
        <div className="modal-position">
          <div className="modal-block">
            <div className="delete-cross">
                <img alt="Cross" src={cross_i} style={{ 'width': '25px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
