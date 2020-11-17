import React, { Component } from 'react' 
import { artistData } from '../artistData'
import { clientData } from '../clientData'
import { Artists } from './Artists'
import { v4 as  uuid_v4 } from 'uuid'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';


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
      id: uuid_v4(),
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
    const { name, alias, email, userType, 
            phone, location, password, artists } = this.state
            
    return(
      <div className="main">      
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form className="registerForm">
                <h1>Sign Up</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={this.handleChange}
                    value={password}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword"
                    onChange={this.handleChange}
                    value={password}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="radio" label="Artist" />
                  <Form.Check type="radio" label="Client" />
                </Form.Group>

                <Button variant="success" type="submit" className="form-control">
                  Sign Up
                </Button>

                <br></br>
                <br></br>
                <hr>
                </hr>
                <Button href="/Login" variant="info" >Login</Button>
              </Form>
            </Col>
          </Row>
        </Container>
          
        <Artists
          artists={ artists }
        />
      </div>     
    )
  }
}



