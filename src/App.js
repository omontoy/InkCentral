import './App.css';
import React, { Component } from 'react';
import { RegisterForm } from  './components/RegisterForm';
import { artistData } from './artistData';
import { Artists } from './components/Artists'

class App extends Component {
  state = {
    name: "",
    alias: "",
    email: "",
    usrType: "",
    phone: "",
    location: "",
    password: "",
    artists: artistData,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log('current', this.state))
    console.log(this.state)
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, alias, location, email, phone, password } = this.state
    const newArtist = {
      name,
      alias,
      location,
      email,
      phone,
      password,
    };

    this.setState({
      artists: [ newArtist, ...this.state.artists ]
    })
  }
  render() {
    const { name, alias, location, email, phone, artists } = this.state
    return (
      <div className="App">
        <RegisterForm
          name={name}
          alias={alias}
          location={location}
          email={email}
          phone={phone}          
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <Artists
          artists={artists}
        />
      </div>
    );
  }
  }    

export default App;