import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProviderCreator from "./ProviderCreator";
import ProviderList from "./ProviderList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Provider Directory</h2>
        </div>
        <div className="Main-body">
          <div className="Provider-creator">
            <ProviderCreator/>
          </div>
          <div className="Provider-list">
            <ProviderList/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
