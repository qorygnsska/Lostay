import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './CardCarousel.css'; // CSS 파일 임포트

export default function CardCarousel({ images }) {

    const sliderRef = useRef(null);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div style={{ position: 'relative' }}>
            <h2>Single Item</h2>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slick-slide">
                        <img src={`eventList/${image}`} alt={`슬라이드 ${index + 1}`} className="carousel-image" />
                        <p className="carousel-caption">gd</p>
                    </div>
                ))}
            </Slider>

            <div style={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
                <button onClick={() => sliderRef.current.slickPrev()} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FaChevronLeft size={30} />
                </button>
                <button onClick={() => sliderRef.current.slickNext()} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FaChevronRight size={30} />
                </button>
            </div>
        </div>
    );
}