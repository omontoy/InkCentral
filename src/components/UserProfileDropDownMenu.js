import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav';
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanLogin } from '../store/loginReducer';
import { resetUserType } from '../store/registerReducer';
import { logoutArtist, getLoggedArtist } from '../store/artistReducer';
import { logoutClient, getLoggedClient } from '../store/clientReducer';
import { deleteArtist } from '../store/actions/artist'
import { deleteClient } from '../store/actions/client'

export function UserProfileDropDownMenu({ user, handleLogOut }) {
  const dispatch = useDispatch();

  function handleClick() {
    if (user === "artist") {
      dispatch(getLoggedArtist())
    }
    else {
      dispatch(getLoggedClient());
    }
  }

  const history = useHistory()

  const handleDelete = () => {

    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(token);

    swal({
      title: "Are you sure to delete your profile?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete && user === 'artist') {        
          dispatch(deleteArtist(decoded.id))
          sessionStorage.clear();
          dispatch(cleanLogin())
          dispatch(resetUserType())
          dispatch(logoutArtist())
          dispatch(logoutClient())
          history.push('/register')
        } else if (willDelete && user === 'client') {          
          dispatch(deleteClient(decoded.id))
          sessionStorage.clear();
          dispatch(cleanLogin())
          dispatch(resetUserType())
          dispatch(logoutArtist())
          dispatch(logoutClient())
          history.push('/register')
        } else {
          swal("Your profile are safe here")
        }
      })
  }

  return (
    <DropdownButton
      menuAlign="right"
      title={<i className="fas fa-2x fa-user-astronaut"></i>}
      id="dropdown-menu-align-right"
      variant="dark"
    >
      <Dropdown.Item eventKey="1" >
        <LinkContainer to={`/${user}-form`} style={{ color: "black" }} >
          <Nav.Link><i className="fas fa-user-edit"></i>   Edit Profile</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">
        <LinkContainer to="/transactions" style={{ color: "black" }}  >
          <Nav.Link onClick={handleClick}><i className="fas fa-columns"></i>   Transactions</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item eventKey="3">
        <LinkContainer to="/customize-profile" style={{ color: "black" }}  >
          <Nav.Link><i className="fas fa-magic"></i>  Customize Profile</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4"  >
        <LinkContainer to="/login" onClick={handleLogOut} style={{ color: "black" }}  >
          <Nav.Link><i className="fas fa-sign-out-alt"></i>   Log Out</Nav.Link>
        </LinkContainer>
      </Dropdown.Item>

      <Dropdown.Divider />
      <Dropdown.Item eventKey="5" onClick={handleDelete}>
        <Nav.Link style={{ color: "red" }}>
          <i className="fas fa-user-minus"></i>   Delete Profile
        </Nav.Link>
      </Dropdown.Item>
    </DropdownButton>
  )
}