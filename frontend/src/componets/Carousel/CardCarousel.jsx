import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './CardCarousel.css'; // CSS 파일 임포트

export default function CardCarousel({ images }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideShowCtn = 3



    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slideShowCtn,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange, // 슬라이드 변경 전 호출되는 핸들러 추가
    };



    return (
        <div className="card--carousle--container">
            <h2>Single Item</h2>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slick-slide">
                        <img src={`eventList/${image}`} alt={`슬라이드 ${index + 1}`} className="carousel-image" />
                        <p>하이염</p>
                    </div>
                ))}
            </Slider>

            <div className="moveBtn">
                {currentSlide > 0
                    ? <button onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                        <FaChevronLeft className="arrow" />
                    </button>
                    : <div></div>
                }
                {currentSlide < images.length - slideShowCtn && ( // slidesToShow 수에 따라 조정
                    <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                        <FaChevronRight className="arrow" />
                    </button>
                )}
            </div>
        </div>
    );
}