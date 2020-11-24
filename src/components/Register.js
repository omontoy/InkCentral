import React, { Component } from 'react'
import { clientData } from '../clientData'
import { v4 as  uuid_v4 } from 'uuid'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';

export class Register extends Component {
  state = {
    email:"",
    userType: "Client",
    password:"",
    confirmPassword:"",
    clients: clientData
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]:value })
  }
  handleRegister = e => {
    e.preventDefault();
    const { email, userType, password, confirmPassword } = this.state
    if(password === confirmPassword) {
      const newUser = {
        id: uuid_v4(),
        email,
        userType,
        password
      }
      if(userType === "Client"){
        this.setState({
          clients: [newUser,...this.state.clients]
        })
        swal("WELCOME !!", "Client created !!", "success")
      } else {
        axios({
          method:'POST',
          baseURL:'http://localhost:8000',
          url:'/artists', 
          data: { email, password }
        })
          .then((response) => {
            const { message } = response.data
            this.props.history.push('/')
            swal("Welcome!!",`${message}`,"success")
          }) 
          .catch((err)=>{
            swal("Sorry!!","Artist Could Not Be Created ", "error")
          })
      }
    } else {
      swal("SORRY !!", "Password and Confirm Password fields must be equal", "error")
    }

  }
  render(){

    const { email, password, confirmPassword } = this.state

    return(
      <div>
        <div className="main">
          <Container>
            <Row className="justify-content-md-center">
              <Col md="4">
                <Form onSubmit={this.handleRegister} className="registerForm">
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
                      value={confirmPassword}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckBox" className="userTypeRadio" >
                    <Form.Check
                      type="radio"
                      label="Artist"
                      name="userType"
                      value="Artist"
                      onChange={this.handleChange}/>
                    <Form.Check
                      type="radio"
                      label="Client"
                      name="userType"
                      value="Client"
                      onChange={this.handleChange}/>
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
        </div>
      </div>
    )
  }
}
