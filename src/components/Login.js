import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';

export class Login extends Component {
  state = {
    email:"",
    userType: "Client",
    password:"",
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleLogin = async e => {
    e.preventDefault();
    const { email, password, userType } = this.state
    try{
      if (userType === "Client"){
          const { data: { token } } = await axios({
          method: 'POST',
          baseURL: 'http://localhost:8000',
          url: '/clients/login',
          data: { email, password }
        });
        localStorage.setItem('token', token)
        this.props.history.push('/');
        swal("WELCOME !!", `${email}`, "success")
      } else {
        const { data: { token } } = await axios({
          method: 'POST',
          baseURL: 'http://localhost:8000',
          url: '/artists/login',
          data: { email, password }
        });
        localStorage.setItem('token', token)
        this.props.history.push('/');
        swal("WELCOME !!", `${email}`, "success")
      }      
    } 
    catch({ response: { data }}){
      swal("SOOOORRY",`${data.message}`,"error")
    }
  }

  render() {
    const { email, password } = this.state
    return(
      <div className="main">
        <Container >
          <Row className="justify-content-md-center">
            <Col md="4"  >
            <Form className="loginForm" onSubmit={this.handleLogin}>
              <h1>Login</h1>
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
                  checked
                  onChange={this.handleChange}/>
              </Form.Group>
              <Button 
                className="form-control" 
                variant="primary" 
                type="submit"> Login </Button>
              <Button variant="link">Forgot your password?</Button>
              <br></br>
              <br></br>
              <hr></hr>
              <Button href="/Register" variant="dark" >Register</Button>
              </Form>
                
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}