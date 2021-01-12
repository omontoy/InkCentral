import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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
import { Loader } from '../components/Loader';
import { Jumbotron } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactWhatsapp from 'react-whatsapp';

import { NicknameInput } from '../components/NicknameInput';
import { ImageInput } from '../components/ImageInput';
import { QuoteInput } from '../components/QuoteInput';
import { SocialMediaInput } from '../components/SocialMediaInput';
import { ContactInformationInput } from '../components/ContactInformationInput';
import { Cover } from '../components/Cover';







export function CustomizeProfile() { 
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { artist, isUpdate, error_artist, isUpdating } = useSelector(
    ({ artistReducer: { artist, isUpdate, error_artist, isUpdating } }) => {
      return { artist, isUpdate, error_artist, isUpdating }
    }
  )
  const handleImageChange = e => {
    dispatch(changeImageInput(e.target.files, artist ))
  }
  const handleChange = e => {
    dispatch(changeInput(e.target, artist ))
  }
  const handleUpdate = async e => {
    e.preventDefault()

    const { name, nickname, phone, location, instagram,
            facebook, twitter, whatsapp, image, quote } = artist

    const data = new FormData()
    data.append('name', name)
    data.append('nickname', nickname)
    data.append('phone', phone)
    data.append('location', location)
    data.append('instagram', instagram)
    data.append('facebook', facebook)
    data.append('twitter', twitter)
    data.append('whatsapp', whatsapp)
    data.append('quote', quote)
    data.append('image', image)
    dispatch(updateArtist( data ))
}

  useEffect(() => {
    if(isUpdate){
      swal("Your data has been updated", `${artist.name}`,"success")
      dispatch(cleanIsUpdate())
      history.push('/')
    }
    else {
      dispatch(getLoggedArtist())
    }
  }, [isUpdate, dispatch, history] );

  useEffect(()=> {
    if(error_artist){
      const statusError = error_artist. response.statusText
      swal("Sorry!!!",`${statusError} Please Login again`, "error")
      dispatch(cleanuperror())
      history.push('/login')
    }
  },[error_artist])

  const { name, email, nickname, phone, instagram,
          facebook, twitter, whatsapp, location, quote, image } = artist

  if(isUpdating) return (
    <Container>
      <h1 className="main">Updating your profile information...</h1>
      <Loader />
    </Container>
  )
  
  return (
    <div className="artistProfileContainer">
        <Form  onSubmit={handleUpdate}>
          <Cover />          
          <CardColumns>
            <ImageInput 
              image={image}
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
              handleImageChange={handleImageChange}
            />
            <QuoteInput 
              quote={quote}
              handleChange={handleChange}
            />   
            <NicknameInput 
            nickname={nickname}
            handleChange={handleChange}
            />  
            <SocialMediaInput 
              instagram={instagram}
              facebook={facebook}
              twitter={twitter}
              whatsapp={whatsapp}
              handleChange={handleChange}
            />
            <ContactInformationInput
              name={name}
              email={email}
              phone={phone}
              location={location}
              handleChange={handleChange}
            />
          </CardColumns>
          <Container className="updateButton" >
            <Button
              variant="warning"
              type="submit"
              style={{width: "300px"}}
            >Update
            </Button>
          </Container>
          
        </Form>
    </div>
  )
}