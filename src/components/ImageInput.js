import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ImageInput({ 
  image,
  show, 
  handleShow, 
  handleClose,
  handleImageChange })
{
  return(
    <Card className="bg-dark text-white">
    <Card.Img src={image} className="artistProfileImage" alt="main tattoo" />
      <div>
        <Button 
          variant="primary" 
          className="form-control" 
          style={{ marginTop: '5px' }} onClick={handleShow}>
          Add Images
        </Button>
        <Modal 
          show={show} 
          onHide={handleClose} 
          animation={false}>
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
            <Button 
              variant="secondary" 
              onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Card>
  )
}