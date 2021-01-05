import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';


export function UserProfileDropDownMenu({ user, handleClick }){  
  return(
    <DropdownButton
      menuAlign="right"
      title={<i class="fas fa-2x fa-user-astronaut"></i>}
      id="dropdown-menu-align-right"
      variant="dark"
    > 
      <Dropdown.Item eventKey="1" >
        <LinkContainer to={`/${user}-form`} className="dropDownLink" >
          <Nav.Link ><i class="fas fa-user-edit"></i>   Edit Profile</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">
        <LinkContainer to="/" className="dropDownLink" >
          <Nav.Link><i class="fas fa-columns"></i>   Dashboard</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="3"  >
        <LinkContainer to="/login" onClick={ handleClick } className="dropDownLink" >
          <Nav.Link><i class="fas fa-sign-out-alt"></i>   Log Out</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
    </DropdownButton>           
  )
}
