import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


export function Artist ({ name, nickname, location, email, phone,image }) {
  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{nickname}</Card.Subtitle>
          
          <ListGroup variant="flush">
            <ListGroup.Item>{location}</ListGroup.Item>
            <ListGroup.Item>{email}</ListGroup.Item>
            <ListGroup.Item>{phone}</ListGroup.Item>
          </ListGroup>
          
          <Card.Link href="#">Go Back</Card.Link>
          <Card.Link href="#">See more</Card.Link>
        </Card.Body>
      </Card>     
  )
}



