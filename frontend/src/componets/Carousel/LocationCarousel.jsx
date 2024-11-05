import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function LocationCarousel({ locationList, check_in, check_out, member }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideShowCtn = 5
    const totalSlides = locationList.length;

    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slideShowCtn,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange,
    };


    return (
        <div className="location--carousel--container">
            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {locationList.map((data) => (
                    <div key={data.locationNo}>
                        <a href={`/hotelList?place=${data.locationName}&check_in=${check_in}&check_out=${check_out}&member=${member}`}>
                            {/* href="https://example.com" JIP1030 수정 */}
                            {/* Link(react-router-dom)으로 하면 검색 모달에서 창이 새로 안불러짐 */}
                            <div className="image--box">
                                <img src={`${process.env.PUBLIC_URL}/Location/${data.locationImage}`} alt={`슬라이드 ${data.locationNo + 1}`} />
                                {/* src=Location/${data.locationImage} JIP1030 수정 */}

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
                    ? <button type="button" onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                        {/* type-"button" JIP1030 추가 */}
                        <FaChevronLeft className="arrow" />
                    </button>
                    : <div></div>
                }
            </div>
            <div className="right--move--btn move--btn">
                {currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                    <button type="button" onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                        {/* type-"button" JIP1030 추가 */}
                        <FaChevronRight className="arrow" />
                    </button>
                )}
            </div>

        </div>
    );
}
