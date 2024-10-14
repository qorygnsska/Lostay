import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function MetropolitanCarousel({ metropolitanList }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideShowCtn = 5
    const totalSlides = metropolitanList.length;

    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slideShowCtn,
        slidesToScroll: 1,
        arrows: true,
        beforeChange: handleBeforeChange,
    };



    return (
        <div className="metropolitan--carousel--container">
            <Slider ref={sliderRef} {...settings}>
                {metropolitanList.map((metropolitan, index) => (
                    <div key={index}>
                        <a href="https://example.com">
                            <div className="image--box">
                                <img src={`eventList/${metropolitan.image}`} alt={`슬라이드 ${index + 1}`} />
                                <div className="overlay">
                                    <span className="text">{metropolitan.metropolitanName}</span>
                                </div>
                            </div>

                        </a>
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
                {currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                    <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                        <FaChevronRight className="arrow" />
                    </button>
                )}
            </div>

        </div>
    );
}
