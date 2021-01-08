import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cleanLogin } from '../store/loginReducer';
import { resetUserType } from '../store/registerReducer';
import { logoutArtist } from '../store/artistReducer';
import { logoutClient } from '../store/clientReducer';
import { UserProfileDropDownMenu } from '../components/UserProfileDropDownMenu';




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

  const handleLogOut = () => {
    sessionStorage.clear();
    dispatch( cleanLogin() )
    dispatch( resetUserType() )
    dispatch( logoutArtist() )
    dispatch( logoutClient() )
  }
  
  let user = userType || userTypeR

  return(
    <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
      <LinkContainer to="/" className="brand">
        <Navbar.Brand>InkCentral</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse> 
        
        <Nav className="mr-auto">
          { token ? (
            <>
              < UserProfileDropDownMenu 
                user= { user }
                handleLogOut = { handleLogOut } 
                className="dropdown"
              />
            </> ) :
            (
              <>
                <LinkContainer to="/login" >
                  <Nav.Link><i className="fas fa-sign-in-alt"></i>   Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link><i className="fas fa-user-plus"></i>   Register</Nav.Link>
                </LinkContainer>
              </>
            )
          }
        </Nav>   
          <Form inline className="searchform">  
            <FormControl type="text" placeholder="Search tattoos"  className="mr-sm-2" /> 
            <Button variant="outline-light" className="searchButton"><i className="fas fa-search"></i></Button>        
          </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
