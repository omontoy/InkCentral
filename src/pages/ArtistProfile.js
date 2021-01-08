import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cleanuperror } from '../store/artistReducer';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { Comments } from '../components/Comments'
import { CommentForm } from '../components/CommentForm'
import { Payment } from '../components/Payment'
import { Loader } from '../components/Loader'
import ReactWhatsapp from 'react-whatsapp';


export function ArtistProfile() {
  const dispatch = useDispatch()
  const history = useHistory();
  const { artist, error_artist, loading } = useSelector(
    ({ artistReducer: { artist, error_artist, loading } }) => {
      return { artist, error_artist, loading }
    })

  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    })

  const { userTypeR } = useSelector(
    ({ registerReducer: { userTypeR } }) => {
      return { userTypeR }
    })

  let user = userType || userTypeR

  useEffect(() => {
    if (error_artist) {
      swal("Sorry!!", `${error_artist.response.statusText} Please Login again`, "error")
      dispatch(cleanuperror())
      history.push('/login');
    }
  }, [error_artist])

  if(loading) return (
    <Container>
      <h1 className="main">Artist data is loading...</h1>
      <Loader />
    </Container>
  )

    const { nickname, image, name, phone, location, email,
            whatsapp, instagram, twitter, facebook } = artist
  return (
    <div className='artistProfileContainer'>
      <Jumbotron className="jumbo" fluid >
        <Container>
          <h1>{nickname}</h1>
          <p>This is a modified jumbotron that occupies the entire horizontal space</p>
        </Container>
      </Jumbotron>

      <CardColumns>
        <Card className="bg-dark text-white">
          <Card.Img src={image} className="artistProfileImage" alt="main tattoo" />
          <Card.ImgOverlay>
            <Card.Title className="imgTitle">{nickname}</Card.Title>
          </Card.ImgOverlay>
        </Card>
        <Card className="p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p><em>The human body is the ultimate canvas...</em></p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                {name}
              </small>
            </footer>
          </blockquote>
        </Card>

        <Card className="p-6 cardTitle" >
          <div class="card-body">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text className="network-title">
                <h2>My Social Networks</h2>
              </Card.Text>
            </Card.Body>

            {
              !facebook && !instagram && !twitter 
              && <h4>Any social network added yet</h4>
            }
            <div className="social-media-icons">
              { facebook && 
                <Link 
                  to={{ pathname: `https://www.facebook.com/${facebook}`}} 
                  target="_blank">
                  <div><i className="fab fa-4x fa-facebook"></i></div>
                </Link> 
              }

              { instagram && 
                <Link 
                  to={{ pathname: `https://www.instagram.com/${instagram}`}} 
                  target="_blank">
                  <div><i className="fab fa-4x fa-instagram"></i></div>
                </Link> 
              }

              { twitter && 
                <Link 
                  to={{ pathname: `https://www.twitter.com/${twitter}`}} 
                  target="_blank">
                  <div><i className="fab fa-4x fa-twitter"></i></div>
                </Link>
              }
            </div>

            <div>
              {
                whatsapp &&
                <Card.Body>
                  <ReactWhatsapp 
                    className="wapp-button"
                    number={`+57 ${whatsapp}`} 
                    message="Hola cómo estás ?">
                    <i className="fa-2x fa fa-whatsapp contactar" />
                    Contáctame 
                  </ReactWhatsapp>     
                </Card.Body>
              }
            </div>
          </div>
        </Card>
        
        <Card>
          <Card.Body>
            <Card.Title className="cardTitle">Artist Information </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Phone: {phone}</ListGroup.Item>
              <ListGroup.Item>Located at: {location}</ListGroup.Item>
              <ListGroup.Item>Email me at: {email}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardColumns>     
      
      { user === "client" ? (
        <>
          <Payment artist={ artist } />
          <CommentForm />
        </>
        ) : (<></>)
      }
      
      <Comments notes={ artist.notes } />
    </div>
  )
}