import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom"
import { artistLogin, clientLogin, cleanuperror } from '../store/loginReducer';
import { useDispatch, useSelector } from 'react-redux'

export function Login(){
  const history = useHistory();
  const dispatch = useDispatch();
  const { login, loading, errorLog } = useSelector(
    ({ loginReducer: { login, loading, errorLog }}) => {
      return { login, loading, errorLog }
    }
  )  
  useEffect(() => {
    if(errorLog){
      swal("Sorry!!",`${ errorLog.message }`,"error")
      dispatch( cleanuperror( errorLog ) )
    }
  },[errorLog])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      history.push('/')
      swal("Welcome!!",`${ email }`,"success")
    }
  },[login])
  const [ loginForm, setLoginForm ] = useState({
    email: "",
    userType: "Client",
    password: "",
  })
  const handleChange = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async e => {
    e.preventDefault();
    const { email, password, userType } = loginForm;
    if (userType === "Client"){
      dispatch(clientLogin(email, password))
    } else {
      dispatch(artistLogin(email, password))
    }      
  }
  const { email, password } = loginForm
  return(
    <div className="main">
      <Container >
        <Row className="justify-content-md-center">
          <Col md="4"  >
          <Form className="loginForm" onSubmit={handleLogin}>
            <h1>Login</h1>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email"
              name="email"
              value={email}
              required 
              onChange={handleChange}
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
              onChange={handleChange} 
            />
            </Form.Group>
            <Form.Group controlId="formBasicCheckBox" className="userTypeRadio" >
              <Form.Check
                type="radio"
                label="Artist"
                name="userType"
                value="Artist"
                onChange={handleChange}/>
              <Form.Check
                type="radio"
                label="Client"
                name="userType"
                value="Client"
                defaultChecked
                onChange={handleChange}/>
            </Form.Group>
            <Button 
              className="form-control" 
              variant="primary" 
              type="submit" 
              disabled= {loading}> Login </Button>
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