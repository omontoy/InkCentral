import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { inkCentralServer } from '../utils/apiaxios'



export function ForgotPassword(){
  const [ resetForm, setResetForm ] = useState( { 
    email: " ",
    userType: "Client",

  } );
  


  const handleChange = e => {
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value
    })
  }

  const sendEmail = async e => {
    e.preventDefault();
    let urlRoute = '';
    const { email, userType } = resetForm;
    console.log(resetForm.userType);
    if(userType === "Client"){
      urlRoute = '/clients/forgotPassword'
    }
    else {
      urlRoute = '/artists/forgotPassword'
    }

    try {
      const response = await inkCentralServer({
        method: 'POST',
        url: urlRoute,
        data: { email }
      })
      console.log(response.data);

    }
    catch (error) {
      console.log(error);
    }
  }



  return(
    <div className="main">
      <Container >
        <Row className="justify-content-md-center">
          <Col md="4">
            <Form className="passwordResetForm" onSubmit={sendEmail}>
              <h1>Password Reset</h1>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  // value={resetEmail}
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
                // disabled={loading}
                >Send Reset Email
              </Button>
              <br></br>
              <br></br>
              <hr></hr>
              <LinkContainer to="/register" variant="dark">
                <Button>Register</Button>
              </LinkContainer>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
