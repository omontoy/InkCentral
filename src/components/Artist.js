import Card from 'react-bootstrap/Card'



export function Artist ({id, name, nickname, email,image }) {
  function handleClick(){
    const token = localStorage.getItem('token')
    if(!token){
      window.location.href = '/login'
    } else {
      window.location.href = `/artist/${id}`
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





