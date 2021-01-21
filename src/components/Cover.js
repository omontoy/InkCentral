import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export function Cover(){
  return(
    <Jumbotron data-testid="jumbotron" className="jumbo" fluid >
      <Container>
      <h1>Update your profile information </h1>
      </Container>
    </Jumbotron>
  )
}
