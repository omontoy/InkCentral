import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { cleanLogin } from '../store/loginReducer'

export function Navigation() {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');

  const { login } = useSelector(
    ({ loginReducer: {login}}) => {
      return { login }
    })
  const handleClick = () => {
    localStorage.clear();
    dispatch( cleanLogin() )
  }
  useEffect(() => {
    history.push('/')
  }, [login])

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
            <Nav.Link>Artist Update</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/clientForm">
            <Nav.Link>Client Update</Nav.Link>
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
