import React from 'react'

import Carousel from 'react-bootstrap/Carousel';

export default function HotelCarousel({images}) {
    return (
        <div className='hotel--carousel--container'>
            <Carousel indicators={false}>
                {images.map(images => (
                    <Carousel.Item>
                    <img src={images} alt='호텔이미지' className='HotelImg' />
                </Carousel.Item>
                ))}
                
                
            </Carousel>
        </div>
    )
}
