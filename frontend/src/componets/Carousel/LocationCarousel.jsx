import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function LocationCarousel({ locationList }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideShowCtn = 5
    const totalSlides = locationList.length;

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
        <div className="location--carousel--container">

            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {locationList.map((data) => (
                    <div key={data.locationNo}>
                        <a href="https://example.com">
                            <div className="image--box">
                                <img src={`eventList/${data.locationImage}`} alt={`슬라이드 ${data.locationNo + 1}`} />
                                <div className="overlay">
                                    <span className="text">{data.locationName}</span>
                                </div>
                            </div>

                        </a>
                    </div>
                ))}
            </Slider>

            {/* 슬라이드 좌우 버튼 */}
            <div className="left--move--btn move--btn">
                {currentSlide > 0
                    ? <button onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                        <FaChevronLeft className="arrow" />
                    </button>
                    : <div></div>
                }
            </div>
            <div className="right--move--btn move--btn">
                {currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                    <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                        <FaChevronRight className="arrow" />
                    </button>
                )}
            </div>

        </div>
    );
}
