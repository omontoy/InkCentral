import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export function ImageSlider( {images} ){ 
    
  return(
    <Carousel>
      {images.map(( image ) => {
        return(
          <Carousel.Item>
          <Card.Img src={ image } className="artistProfileImage" alt="main tattoo" />

          {/* <Carousel.Caption>
          <h1>Ink life</h1>
          </Carousel.Caption> */}

          </Carousel.Item>
        )      
      })}  
    </Carousel>
  )
}