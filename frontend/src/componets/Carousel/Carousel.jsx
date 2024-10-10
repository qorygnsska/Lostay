import React, { useRef } from 'react';
import Slider from 'react-slick';

export default function Carousel() {

    const sliderRef = useRef(null);

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
    };

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Slider ref={sliderRef} {...settings} style={{ width: '200px', height: '200px' }}>
                <div style={{ width: '200px', height: '200px', background: 'skyblue', color: 'red' }}></div>
                <div style={{ height: '200px', background: 'skyblue' }}></div>
                <div style={{ height: '200px', background: 'skyblue' }}></div>
                <div style={{ height: '200px', background: 'skyblue' }}></div>
            </Slider>
            <div>
                <button onClick={() => sliderRef.current.slickPlay()}>재생</button>
                <button onClick={() => sliderRef.current.slickPause()}>정지</button>
            </div>
        </div>
    )
}
