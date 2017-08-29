import React, { Component } from 'react';
import './ProviderList.css';
import ProviderItem from "./ProviderItem.js"

class ProviderList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="List-body">
        <p className="List-title">Provider List</p>
        <div>
          <select value={this.props.sortID}
                onChange={(e) => {this.props.sortFunction(e)}}>
            <option value="Ascending Name">A...Z Name</option>
            <option value="Descending Name">Z...A Name</option>
            <option value="Ascending Email">A...Z Email</option>
            <option value="Descending Email">Z...A Email</option>
            <option value="Ascending Specialty">A...Z Specialty</option>
            <option value="Descending Specialty">Z...A Specialty</option>
            <option value="Ascending Practice">A...Z Practice</option>
            <option value="Descending Practice">Z...A Practice</option>
          </select>

        </div>
        <div className="Scroller-body">
          <div>
            <form onSubmit={(e) => {this.props.handleDeleteFormSubmit(e)}}>
              {this.props.sortProvider().map((provider) => {
                return (<ProviderItem key={provider.data.first_name + provider.data.last_name + provider.data.email_address + provider.data.specialty + provider.data.practice_name} provider = {provider} onToggle={this.props.onToggle} isToggle={provider.toggled}/>)
              })}
              <button className="List-button" type="submit">Remove</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderList;
