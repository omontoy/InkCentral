import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { cleanLogin } from '../store/loginReducer'
import { resetUserType } from '../store/registerReducer'
import { logoutArtist } from '../store/artistReducer'
import { logoutClient } from '../store/clientReducer'

export function Navigation() {
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('token');

  const { userType } = useSelector(
    ({ loginReducer: { userType }}) => {
      return { userType }
    })

  const { userTypeR } = useSelector(
    ({ registerReducer: { userTypeR }}) => {
        return { userTypeR }
    })

  const handleClick = () => {
    sessionStorage.clear();
    dispatch( cleanLogin() )
    dispatch( resetUserType() )
    dispatch( logoutArtist() )
    dispatch( logoutClient() )
  }
  
  let user = userType || userTypeR

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
            <LinkContainer to={`/${user}-form`}>
              <Nav.Link>User Update</Nav.Link>
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
