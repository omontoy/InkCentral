import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getLoggedArtist,
  updateArtist,
  changeInput,
  changeImageInput,
  cleanIsUpdate,
  cleanuperror
} from '../store/artistReducer';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';

export function ArtistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { artist, isUpdate, error_artist } = useSelector(
    ({ artistReducer: { artist, isUpdate, error_artist } }) => {
      return { artist, isUpdate, error_artist }
    }
  )
  const handleImageChange = e => {
      dispatch(changeImageInput( e.target.files, artist ))
  }
  const handleChange = e => {
    dispatch(changeInput(e.target, artist))
  }
  const handleUpdate = async e =>{
    e.preventDefault()
    const { name, nickname, phone, location, image } = artist
    const data = new FormData()
    data.append('name', name);
    data.append('nickname', nickname);
    data.append('phone', phone);
    data.append('location', location);
    data.append('image', image);
    dispatch(updateArtist( data ))
  }

  useEffect(() => {
      if(isUpdate){
        swal("Your data has been updated",`${artist.name}`,"success")
        dispatch(cleanIsUpdate())
        history.push('/')
      }
      else {
        dispatch(getLoggedArtist())
      }
  }, [isUpdate, dispatch, history] );

  useEffect(() => {
    if(error_artist){
      const statusError = error_artist.response.statusText
      swal("Sorry!!",`${statusError} Please Login again`, "error")
      dispatch( cleanuperror() )
      history.push('/login')
    }
  }, [error_artist])

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
                <>
                  <Button variant="primary" className="form-control" style={{ marginTop: '5px' }} onClick={handleShow}>
                    Add Images
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Please choose your image to upload:
                      <br></br>
                      <label htmlFor="file">Image(s): </label>
                      <input 
                        type="file"
                        accept="image/*"
                        multiple
                        name="file"
                        id="file"
                        onChange={handleImageChange}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      
                      
                      
                    </Modal.Footer>
                  </Modal>
                </>
                <Button
                  variant="warning"
                  type="submit"
                  className="form-control"
                  style={{ marginTop: '5px' }}
                >Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
