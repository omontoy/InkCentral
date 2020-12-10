import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getLoggedArtist, updateArtist, changeInput } from '../store/artistReducer';
import swal from 'sweetalert';


export function ArtistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { artist, isUpdate } = useSelector(
    ({ artistReducer: { artist, isUpdate } })=> {
      return { artist, isUpdate }
    }
  )
  
  const handleChange = e => {
    dispatch(changeInput(e.target.name, e.target.value))
  }
  const handleUpdate = async e =>{
    e.preventDefault()    
    const { name, nickname, phone, location } = artist
    dispatch(updateArtist(name, nickname, phone, location))
  }

  useEffect(()=>{
    if(isUpdate){
      history.push('/')
      swal("Your data has been updated",`${artist.name}`,"success")
    } 
    else {
      dispatch(getLoggedArtist())
    }
  }, [isUpdate, dispatch, history]);


  const { name, email, nickname, phone, location } = artist
  

  return(
    <div >
      <div className="main">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form  className="updateForm" onSubmit={handleUpdate} >
                <h2>Update Form</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
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
                    placeholder="email"
                    onChange={handleChange}
                    value={email}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={nickname}
                    
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    onChange={handleChange}
                    value={phone}
                    
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
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




