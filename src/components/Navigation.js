import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'

export function Navigation() {

  const handleClick = () => localStorage.clear();

  const token = localStorage.getItem('token');

  return(
    <Navbar fixed="top" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>InkCentral</Navbar.Brand>
      </LinkContainer>

      <Nav className="mr-auto">
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>

        { token ? (
          <>
          <LinkContainer to="/artistForm">
            <Nav.Link>Edit my Profile</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/login" onClick={handleClick}>
            <Nav.Link>Logout</Nav.Link>
          </LinkContainer>
          </> ) :
          (
            <>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            </>
        )}

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    )
}
