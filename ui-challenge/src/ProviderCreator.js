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
        <div className="Creator-title-box">
          <p className="Creator-title">Create Provider</p>
        </div>
        <form onSubmit={(e) => {this.props.handleNewFormSubmition(e)}} className="Creator-form">
          {this.props.providersCreateContent.map((content) => {
            return (
              <div className="Creator-form-input" key={content.text}>
                <label>
                  <p className="Creator-label"> {content.text} </p>
                  <div className="Creator-box">
                    <input className="Creator-input" style={{"backgroundColor" : ((content.error) ? "#FFEBEB" : "#FFFFFF" )}} type="text" value={content.value} onChange={(e) => {this.props.handleChange(e,content)}} />
                  </div>
                </label>
              </div>
          )})}
          <div className="Creator-submit-button-box">
            <button className="Creator-submit-button" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProviderCreator;
