import React from 'react'

import Carousel from 'react-bootstrap/Carousel';

export default function HotelCarousel() {
    return (
        <div className='hotel--carousel--container'>
            <Carousel indicators={false}>
                <Carousel.Item>
                    <img src='/HotelList/호텔1.jpg' alt='호텔이미지' className='HotelImg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='/HotelList/호텔1.jpg' alt='호텔이미지' className='HotelImg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='/HotelList/호텔1.jpg' alt='호텔이미지' className='HotelImg' />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
