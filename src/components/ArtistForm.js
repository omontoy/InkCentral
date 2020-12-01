import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';

export class ArtistForm extends Component {
  state = {
    email: "",
    name: "",
    nickname: "",
    location: "",
    phone: ""
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]:value })
  }

  handleArtistForm = async e => {
    e.preventDefault()
    const { name, nickname, location, phone } = this.state
    const token = localStorage.getItem('token')
    try {
      const response = await axios({
        method:'PUT',
        baseURL:'http://localhost:8000',
        url:'/artists/profile',
        data: { name, nickname, location, phone },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const { message } = response.data
      this.props.history.push('/')
      swal("Actualizado!!",`${message}`,"success")
    }
    catch({ response: { data }}) {
      swal("Sorry!!", `${data.message}`,"error")
    }
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/artists/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const { data } = response.data
      this.setState({
        email: data.email,
        name: data.name,
        location: data.location,
        nickname: data.nickname,
        phone: data.phone
      })
    }
    catch({ response: { data }}) {
      swal("Sorry!!", `${data.message}`,"error")
    }
  }

  render(){
    const { email, name, nickname, location, phone } = this.state

    return(
      <div>
        <div className="main">
          <Container>
            <Row className="justify-content-md-center">
              <Col md="4">
                <Form onSubmit={this.handleArtistForm} className="registerForm">
                  <h2>Artist Form</h2>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full name"
                      name="name"
                      onChange={this.handleChange}
                      value={name}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                      disabled
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nickname"
                      name="nickname"
                      onChange={this.handleChange}
                      value={nickname}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cell phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cell phone"
                      name="phone"
                      onChange={this.handleChange}
                      value={phone}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      name="location"
                      onChange={this.handleChange}
                      value={location}
                    />
                  </Form.Group>

                  <Button variant="warning" type="submit" className="form-control">
                    Edit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
