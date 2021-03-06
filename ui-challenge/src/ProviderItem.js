import React, { Component } from 'react';
import './ProviderItem.css';

class ProviderItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="Provider-item">
        <div className="Checkbox-box">
          <input className="Checkbox" type="checkbox" checked={this.props.isToggle} onClick={() => this.props.onToggle(this.props.provider)}/>
        </div>
        <div className="List-body" style={{"backgroundColor": ((this.props.provider.color) ? "#CACACD" : "#DEDEE1")}}>
          <div className="List-left">
            <p className="List-name">{this.props.provider.data.last_name + ", " + this.props.provider.data.first_name}</p>
            <p className="List-email">{this.props.provider.data.email_address}</p>
          </div>
          <div className="List-right">
            <p className="List-specialty">{this.props.provider.data.specialty}</p>
            <p className="List-practice">{this.props.provider.data.practice_name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderItem;
