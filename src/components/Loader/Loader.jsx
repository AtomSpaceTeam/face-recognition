import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    return (
      <div>
        <span className="loader">
          <span className="loader-inner" />
        </span>
      </div>
    );
  }
}

export default Loader;
