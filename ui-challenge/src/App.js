import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProviderCreator from "./ProviderCreator";
import ProviderList from "./ProviderList";

class App extends Component {
  constructor(props) {
    super(props)

    // Holds the initial information of the providers
    // Also holds the values for the submit form to create new providers
    // Sets a default sorting choice
    this.state = {
    providersList: [
                  {data: {"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
                  toggled: false,
                  color: true},
                  {data: {"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
                  toggled: false,
                  color: true},
                  {data: {"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
                  toggled: false,
                  color: true},
                  {data: {"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
                  toggled: false,
                  color: true},
                  {data: {"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting’s Well Kids Pediatrics"},
                  toggled: false,
                  color: true},
                  {data: {"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"},
                  toggled: false,
                  color: true}
    ],
    providersCreateContent: [
      {text: "Last Name:",
       value: "",
       error: false},
      {text: "First Name:",
       value: "",
       error: false},
      {text: "Email Address:",
       value: "",
       error: false},
      {text: "Specialty:",
       value: "",
       error: false},
      {text: "Practice Name:",
       value: "",
       error: false}
    ],
    sortID: "Ascending Name",
    search: ""
  };

    // Binds all the functions so that they can use this
    this.onToggle = this.onToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sortFunction = this.sortFunction.bind(this);
    this.sortProvider = this.sortProvider.bind(this);
    this.handleNewFormSubmition = this.handleNewFormSubmition.bind(this);
    this.handleDeleteFormSubmit = this.handleDeleteFormSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

  }

  // Handle change of the text inputs in the create provider form
  // e should be an event and content should be the content recieving the change
  handleChange(e,content) {

    // First we create a variable to alter this.state
    var providersCreateContent = [...this.state.providersCreateContent];

    // Change the content and then find its index
    content.value = e.target.value;
    var i = 0;
    for (; i < this.state.providersCreateContent.length; i++) {
      if (content.text === this.state.providersCreateContent[i].text) break;
    }
    // Now modify our new List so that it has our new value
    providersCreateContent[i].value=e.target.value;

    // If it was currently red due to submitting while empty make it white if it's
    // not empty
    if (e.target.value !== "") providersCreateContent[i].error = false;
    this.setState({providersCreateContent})

  }

  handleSearchChange(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  // handles the click event of the checkboxes
  onToggle(provider) {
    // Makes a list of providers that is not this
    let providers = this.state.providersList.filter((p)=>{
      return p.data !== provider.data;
    });

    // Invert the boolean for rendering as toggled
    provider.toggled = !(provider.toggled);

    // Change the state to the new modified one
    this.setState({providers: [ ...providers, provider ]})
  }

  // Handles the submission of a new provider
  handleNewFormSubmition(e) {

    // Stop the page from refreshing
    e.preventDefault();

    // Unbundle the content so it's immutable
    var providersCreateContent = [].concat(this.state.providersCreateContent);

    // Check if all inputs have content
    var valid = true;
    for (var i = 0; i < providersCreateContent.length; i++) {
      if (providersCreateContent[i].value === "") {
        valid = false;

        // Set the error flag so it turns red
        providersCreateContent[i].error = true;
      }
    }

    // Create the new provider in the form of an Object mimicking JSON
    var newProvider = {data: {"last_name": providersCreateContent[0].value,
                              "first_name": providersCreateContent[1].value,
                              "email_address": providersCreateContent[2].value,
                              "specialty": providersCreateContent[3].value,
                              "practice_name": providersCreateContent[4].value},
                       toggled: false}

    // If given a proper submission
    if (valid) {
      // Go though the providersCreateContent and set everything so we
      // Can receive a fresh submission
      for (i = 0; i < providersCreateContent.length; i++) {
        providersCreateContent[i].value = "";
      }

      // Alter the state
      this.setState({providersList: [...this.state.providersList, newProvider]});
    }

    // Alter the state
    this.setState({providersCreateContent});
  }

  // Handles deleting all the selected providers
  handleDeleteFormSubmit(e) {

    // Stop the page from refreshing
    e.preventDefault();

    // Get the providers that are not toggled
    let providersList = this.state.providersList.filter((p)=>{
      return !p.toggled;
    });

    // Alter the state
    this.setState({providersList})
  }

  // Handles the update of the sorting method
  sortFunction(e) {
    this.setState({sortID: e.target.value});
  }

  // Handles the different sort methods
  // It's very chunky but it gets the job done
  // returns the sorted list of providers
  sortProvider(sortList) {
    if (this.state.sortID === "Ascending Name") {
      sortList.sort((a,b) => {
        var x = a.data.last_name + ", " + a.data.first_name; var y = b.data.last_name + ", " + b.data.first_name;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    } else if (this.state.sortID === "Descending Name") {
      sortList.sort((a,b) => {
        var x = a.data.last_name + ", " + a.data.first_name; var y = b.data.last_name + ", " + b.data.first_name;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    } else if (this.state.sortID === "Ascending Email") {
      sortList.sort((a,b) => {
        var x = a.data.email_address; var y = b.data.email_address;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    } else if (this.state.sortID === "Descending Email") {
       sortList.sort((a,b) => {
        var x = a.data.email_address; var y = b.data.email_address;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    } else if (this.state.sortID === "Ascending Specialty") {
    sortList.sort((a,b) => {
        var x = a.data.specialty; var y = b.data.specialty;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    } else if (this.state.sortID === "Descending Specialty") {
      sortList.sort((a,b) => {
        var x = a.data.specialty; var y = b.data.specialty;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    } else if (this.state.sortID === "Ascending Practice") {
      sortList.sort((a,b) => {
        var x = a.data.practice_name; var y = b.data.practice_name;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    } else if (this.state.sortID === "Descending Practice") {
      sortList.sort((a,b) => {
        var x = a.data.practice_name; var y = b.data.practice_name;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    }
    for (var i = 0; i < sortList.length; i++) {
      sortList[i].color = (i % 2 === 0);
    }

    return (sortList);
  }

  // Render function for the whole app
  // Breaks it up into three blocks
  // The Header, The Content Creator, and The List of Content
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Provider Directory</h2>
        </div>
        <div className="Main-body">
          <div className="Provider-creator">
            <ProviderCreator providersCreateContent={this.state.providersCreateContent} handleNewFormSubmition={this.handleNewFormSubmition} handleChange={this.handleChange}/>
          </div>
          <div className="Provider-list">
            <ProviderList providersList={this.state.providersList} onToggle={this.onToggle} handleDeleteFormSubmit={this.handleDeleteFormSubmit} sortID={this.state.sortID} sortFunction={this.sortFunction} handleSearchChange={this.handleSearchChange} sortProvider={this.sortProvider} search={this.state.search}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
