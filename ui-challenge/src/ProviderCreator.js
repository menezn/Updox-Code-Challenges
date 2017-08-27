import React, { Component } from 'react';
import './ProviderCreator.css';

class ProviderCreator extends Component {
  constructor() {
    super();
    this.state = {
      values: Array(5).fill(null),
    };
  }

  render() {
    return (
      <div className="Creator-body">
        <p className="Creator-title">Create Provider</p>
        <div className="Creator-form">
          <label>
            <p className="Creator-label"> Last Name: </p>
            <input className="Creator-input" type="text" name="name" value={this.state.values[0]} onChange={this.handleChange} />
          </label>
          <label>
            <p className="Creator-label"> First Name: </p>
            <input className="Creator-input" type="text" name="name" value={this.state.values[1]} onChange={this.handleChange}/>
          </label>
          <label>
            <p className="Creator-label"> Email Address: </p>
            <input className="Creator-input" type="text" name="name" value={this.state.values[2]} onChange={this.handleChange}/>
          </label>
          <label>
            <p className="Creator-label"> Specialty: </p>
            <input className="Creator-input" type="text" name="name" value={this.state.values[3]} onChange={this.handleChange}/>
          </label>
          <label>
            <p className="Creator-label"> Practice Name: </p>
            <input className="Creator-input" type="text" name="name" value={this.state.values[4]} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </div>
      </div>
    );
  }
}

export default ProviderCreator;
