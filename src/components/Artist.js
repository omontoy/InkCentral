import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getArtist } from '../store/artistReducer'

export function Artist ({ id, name, nickname, email, image}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')

  function handleClick(){
    dispatch(getArtist(id))
    if(!token){
      history.push('/login')
    } else {
      history.push(`/artists/${id}`)
    }
  }
  return (
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
  )
}





