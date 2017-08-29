import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProviderCreator from "./ProviderCreator";
import ProviderList from "./ProviderList";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    providersList: [
                  {data: {"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
                  toggled: false},
                  {data: {"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
                  toggled: false},
                  {data: {"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
                  toggled: false},
                  {data: {"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
                  toggled: false},
                  {data: {"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting’s Well Kids Pediatrics"},
                  toggled: false},
                  {data: {"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"},
                  toggled: false}
    ],
    providersCreateContent: [
      {text: "Last Name:",
       value: ""},
      {text: "First Name:",
       value: ""},
      {text: "Email Address:",
       value: ""},
      {text: "Specialty:",
       value: ""},
      {text: "Practice Name:",
       value: ""}
    ],
    sortID: "Ascending Name"
  };


    this.onToggle = this.onToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sortFunction = this.sortFunction.bind(this);
    this.sortProvider = this.sortProvider.bind(this);
    this.handleNewFormSubmition = this.handleNewFormSubmition.bind(this);
    this.handleDeleteFormSubmit = this.handleDeleteFormSubmit.bind(this);

  }

  handleChange(e,content) {
    var providersCreateContent = [...this.state.providersCreateContent];
    content.value = e.target.value;
    var i = 0;
    for (; i < this.state.providersCreateContent.length; i++) {
      if (content.text === this.state.providersCreateContent[i].text) break;
    }
    providersCreateContent[i].value=e.target.value;
    this.setState({providersCreateContent})

  }
  onToggle(provider) {
    let providers = this.state.providersList.filter((p)=>{
      return p.data !== provider.data;
    });

    provider.toggled = !(provider.toggled);
    providers = [
      ...providers,
      provider
    ]

    this.setState({providers})
  }

  handleNewFormSubmition(e) {
    e.preventDefault();
    var valid = true;

    for (var i = 0; i < this.state.providersCreateContent.length; i++) {
      if (this.state.providersCreateContent[i].value === "") {
        valid = false;
        break;
      }
    }
    var providersCreateContent = this.state.providersCreateContent

    var newProvider = {data: {"last_name": providersCreateContent[0].value,
                              "first_name": providersCreateContent[1].value,
                              "email_address": providersCreateContent[2].value,
                              "specialty": providersCreateContent[3].value,
                              "practice_name": providersCreateContent[4].value},
                       toggled: false}

    if (valid) {
      for (i = 0; i < providersCreateContent.length; i++) {

        providersCreateContent[i].value = "";
      }

      let providersList = [...this.state.providersList, newProvider];
      this.setState({providersList});
      this.setState({providersCreateContent});
      // this.sortProviders();
    }
  }

  handleDeleteFormSubmit(e) {
    e.preventDefault();
    let providersList = this.state.providersList.filter((p)=>{
      return !p.toggled;
    });
    this.setState({providersList})
  }

  sortFunction(e) {
    e.preventDefault();
    var sortID = e.target.value;
    this.setState({sortID});
  }

  sortProvider() {
    let sortList = [].concat(this.state.providersList)
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
    return (sortList);
  }

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
            <ProviderList providersList={this.state.providersList} onToggle={this.onToggle} handleDeleteFormSubmit={this.handleDeleteFormSubmit} sortID={this.state.sortID} sortFunction={this.sortFunction} sortProvider={this.sortProvider}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
