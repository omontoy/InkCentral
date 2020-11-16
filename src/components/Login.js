import React, { Component } from 'react'
import { artistData } from '../artistData'
import { clientData } from '../clientData'
import { Link } from 'react-router-dom'


export class Login extends Component {
  state = {
    email: "",
    password: "",
    artists: artistData,
    clients: clientData
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }
  handleLogin = e => {
    e.preventDefault()
    const { email, password, artists, clients } = this.state
    
    const clientConfirm = clients.filter(client => client.email === email 
                                             && client.password === password)
    const artistConfirm = artists.filter(artist => artist.email === email 
                                             && artist.password === password)
    
    alert(clientConfirm.length > 0 || artistConfirm.length > 0
      ? "Usuario Logeado" : "Usuario y/o contraseña incorrectos")
  }
  render() {
    const { email, password } = this.state
    return(
      <div className="App">
        <form onSubmit={this.handleLogin} >
          <label htmlFor="email">E-mail</label>
          <br></br>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <br></br>
          <input 
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <button>Login</button>
          <br></br>
          <br></br>
          <hr/>
          <Link to="/Register">Register</Link>
        </form>
      </div>
    )
  } 
}