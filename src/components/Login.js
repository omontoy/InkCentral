import React, { Component } from 'react'
import { artistData } from '../artistData'

export class Login extends Component {
  state = {
    email: "",
    password: "",
    artists: artistData
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }
  handleLogin = e => {
    e.preventDefault()
    const { email, password } = this.state
    const artist = this.state.artists
    let mailConfirm = artist.filter(art => art.email === email &&
      art.password === password)
    alert(mailConfirm.length > 0
      ? "Usuario Logeado" : "Usuario y/o contraseña incorrectos")
  }
  render() {
    const { email, password } = this.state
    return(
      <div className="App">
        <form onSubmit={this.handleLogin} >
          <label htmlFor="email">E-mail</label>
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
        </form>
      </div>
    )
  } 
}