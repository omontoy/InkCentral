import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getArtist } from '../store/artistReducer';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container'




function ArtistProfile() {
  let { artistId } = useParams();
  const dispatch = useDispatch()
  const { artist, error } = useSelector(
    ({artistReducer: { artist, error }})=> {
      return { artist, error }
    })
  useEffect(()=>{
    dispatch(getArtist(artistId))
  }, [dispatch, artistId ]);
  
  if(error) return <h1 className="main">
                      Ooops! Something went wrong with the chosen artist data request!!
                      Please login again
                    </h1>
    
  return(
    <div className='artistProfileContainer'>
      <Jumbotron className="jumbo" fluid >
        <Container>
          <h1>{artist.nickname}</h1>
          <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
      
      <CardColumns>
        <Card className="bg-dark text-white">
          <Card.Img src={artist.image} className="artistProfileImage" alt="main tattoo" />
          <Card.ImgOverlay>
            <Card.Title className="imgTitle">{artist.nickname}</Card.Title>
          </Card.ImgOverlay>
        </Card>
        <Card className="p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p><em>The human body is the ultimate canvas...</em></p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                {artist.name} 
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card className="p-6 cardTitle" >
          <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
            <Card.Text>
              Check my work out through social media too with the following links
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><i class="fab fa-2x fa-instagram"></i></ListGroup.Item>
            <ListGroup.Item><i class="fab fa-2x fa-facebook"></i></ListGroup.Item>
            <ListGroup.Item><i class="fab fa-2x fa-linkedin"></i></ListGroup.Item>
            <ListGroup.Item><i class="fab fa-2x fa-discord"></i></ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Contact</Card.Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
          <Card.Title className="cardTitle">Artist Information </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Phone: {artist.phone}</ListGroup.Item>
              <ListGroup.Item>Located at: {artist.location}</ListGroup.Item>
              <ListGroup.Item>Email me at: {artist.email}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardColumns>
    </div>
  )
}
export default ArtistProfile;
