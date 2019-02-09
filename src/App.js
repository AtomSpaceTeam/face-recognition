import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  createMentor = async () => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    fetch("http://localhost:8000/api",{
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: 'Alex'})
    })
    .then((res) => {
      return res.json();
    })
    .then((ex) => console.log(ex))
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.createMentor}>Hello</button>
        </header>
      </div>
    );
  }
}

export default App;
