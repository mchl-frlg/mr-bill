import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react';
import carousel from './carouselData'

const SignupCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
    <div className='row'>
      <div className='col-sm-4 offset-md-4'>
        <Carousel width={300}>
          {carousel.map(item => {
            return (
              <Carousel.Item key={item.key}>
                <h1>{item.icon}</h1>
                <h3 style={{"fontFamily": "'Courier New', Monospace"}}>{item.title}</h3>
                <p>{item.description}</p>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default SignupCarousel