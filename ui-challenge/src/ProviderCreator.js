import React, { Component } from 'react';
import './ProviderCreator.css';

class ProviderCreator extends Component {
  constructor(props) {
    super(props);
    this.props = props
  }

  render() {
    return (
      <div className="Creator-body">
        <p className="Creator-title">Create Provider</p>
        <div className="Creator-form">
          <div className="Creator-form-input">
            <form onSubmit={(e) => {this.props.handleNewFormSubmition(e)}}>
              {this.props.providersCreateContent.map((content) => {
                return (
                  <label key={content.text}>
                    <p className="Creator-label"> {content.text} </p>
                    <input className="Creator-input" type="text" value={content.value} onChange={(e) => {this.props.handleChange(e,content)}} />
                  </label>
              )})}
              <button className="Creator-submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderCreator;
