import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLoggedArtist, updateArtist } from '../store/artistReducer';
import swal from 'sweetalert';


export function ArtistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { artist, isUpdate } = useSelector(
    ({ artistReducer: { artist, isUpdate } })=> {
      return { artist, isUpdate }
    }
  )
  const [ updateForm, setUpdateForm ] = useState({ 
    name: "",
    nickname: "",
    phone: "",
    location: ""
  })
  
  const handleChange = e => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    })
  }
  const handleUpdate = async e =>{
    e.preventDefault()
    let { name, nickname, phone, location } = updateForm
    name === "" && (name = artist.name )
    nickname === "" && (nickname = artist.nickname )
    phone === "" && (phone = artist.phone)
    location === "" && (location = artist.location)

    dispatch(updateArtist(name, nickname, phone, location))
  }

  useEffect(()=>{
    if(isUpdate){
      history.push('/')
      swal("Your data has been updated",`${name}`,"success")
    } 
    else {
      dispatch(getLoggedArtist())
    }
  }, [isUpdate, dispatch, history]);


  const { name, email, nickname, phone, location } = updateForm
  

  return(
    <div >
      <div className="main">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form  className="updateForm" onSubmit={handleUpdate} >
                <h2>Update Form</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label><em>Current name stored: {artist.name}</em></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Update your name here"
                    name="name"
                    onChange={handleChange}
                    value={name}
                  />
                  
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={artist.email}
                    onChange={handleChange}
                    value={email}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label><em>Current nickname stored: {artist.nickname}</em></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Update your nickname here"
                    name="nickname"
                    onChange={handleChange}
                    value={nickname}
                    
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label><em>Current phone stored: {artist.phone} </em></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Update your phone here"
                    name="phone"
                    onChange={handleChange}
                    value={phone}
                    
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label><em>Current location stored: {artist.location} </em></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Update your location here"
                    name="location"
                    onChange={handleChange}
                    value={location}
                  
                  />                  
                </Form.Group>
                <Button variant="warning" type="submit" className="form-control" style={{ marginTop: '5px' }}>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}




