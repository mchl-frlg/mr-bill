import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react';
import carousel from './carouselData'

const SignupCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {carousel.map(item => {
        return (
          <div key={item.key}>
          <h1>{item.title}</h1>
            <h3>{item.description}</h3>
            <img
            width={200}
            src='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg'
            alt='cat'
            />
        </div>
        )
      })}
    </>
  );
}

export default SignupCarousel