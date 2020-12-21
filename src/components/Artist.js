import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getArtist } from '../store/artistReducer'
import { LinkContainer } from 'react-router-bootstrap'

export function Artist ({ id, name, nickname, email, image}) {
  const dispatch = useDispatch();
  const { login } = useSelector(
    ({ loginReducer: { login }})=> {
      return { login }
    }
  )
  const token = sessionStorage.getItem('token');

  function handleClick(){
    if(login){
      dispatch(getArtist(id))  
    }
  }
  return (
    <LinkContainer to={!token ? '/login': `/artists/${id}`}>
      <Card  
        bg="dark" 
        text="light" 
        className='artistCards'
        style={{ borderRadius: "25px" }}
        onClick={handleClick}
      >
        <Card.Img 
          variant="bottom" 
          src={image} 
          className="cardImage"
          style={{ borderRadius: "25px", borderBottomLeftRadius: "0px", borderBottomRightRadius:"0px" }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{nickname}</Card.Subtitle>
          <Card.Text>{email}</Card.Text>
        </Card.Body>
      </Card> 
    </LinkContainer>
  )
}





