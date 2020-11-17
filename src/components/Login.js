import React, { Component } from 'react'
import { artistData } from '../artistData'
import { clientData } from '../clientData'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';

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
      <div className="main">
        <Container >
          <Row className="justify-content-md-center">
            <Col md="4"  >
            <Form className="loginForm" onSubmit={this.handleLogin}>
              <h1>
                Login
              </h1>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                name="email"
                value={email}
                required 
                onChange={this.handleChange}
              />   
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={this.handleChange} 
              />
              </Form.Group>
              <br></br>
              <Button 
                className="form-control" 
                variant="primary" 
                type="submit"> Login </Button>
              <Button variant="link">Forgot your password?</Button>
              <br></br>
              <br></br>
              <hr>
              </hr>
              <br></br>
              <Button href="/Register" variant="dark" >Register</Button>
              </Form>
                
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}



