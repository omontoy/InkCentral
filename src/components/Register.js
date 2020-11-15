import React, { Component } from 'react' 
import { artistData } from '../artistData'
import { clientData } from '../clientData'
import { Artists } from './Artists'


export class Register extends Component {
  state = {
    name:"",
    alias:"",
    email:"",
    userType: "Client",
    phone:"",
    location:"",
    password:"",
    artists: artistData,
    clients: clientData
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]:value })
  }

  handleRegister = e => {
    e.preventDefault();
    const { name, alias, email, userType, phone, location, password } = this.state
    const newUser = {
      name, 
      alias,
      email,
      userType,
      phone, 
      location,
      password
    }
    if(userType === "Client"){
      this.setState({
        clients: [newUser,...this.state.clients]
      })
    } else {
      this.setState({
        artists: [newUser,...this.state.artists]
      })
    }
    
  }

  render(){
    console.log(this.state.clients);
    const { name, alias, email, userType, phone, location, password, artists } = this.state
    return(
      <div className="App">    
        <form onSubmit={this.handleRegister}>
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={name}
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="alias">Alias</label>
          <br></br>
          <input
            type="text"
            id="alias"
            name="alias"
            onChange={this.handleChange}
            value={alias}
          />
          <br></br>
          <br></br>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
            value={password}
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="client">Client</label>
          <input 
            type="radio" 
            id="client" 
            name="userType" 
            onChange={this.handleChange}
            value="Client"
            defaultChecked
          />
          <br></br>
          <br></br>
          <label htmlFor="artist">Artist</label>
          <input 
            type="radio" 
            id="artist" 
            name="userType" 
            onChange={this.handleChange}
            value="Artist"
          />
          <br></br>
          <br></br>
          <label htmlFor="phone" 
                 hidden={
                  userType === "Client" && true
                 }>Phone</label>
          <br></br>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            pattern="[0-9]{10}"
            placeholder="10 digits"
            onChange={this.handleChange}
            value={phone}
            hidden= {
             userType === "Client" && true
            }
          />
          <br></br>
          <br></br>
          <label htmlFor="location" 
                 hidden={
                  userType === "Client" && true
                 }>Location</label>
          <br></br>
          <input 
            type="text" 
            id="location" 
            name="location" 
            onChange={this.handleChange}
            value={location}
            hidden= {
              userType === "Client" && true
            }
          />
          <br></br>
          <br></br>
          <button>Register</button>
        </form>
        <br></br>
        <br></br>
        <hr/>
        <Artists
          artists={ artists }
        /> 
      </div>
      
      
    )
  }
}
