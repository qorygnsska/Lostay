import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function CardCarousel({ hotelList }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideShowCtn = 3
    const totalSlides = hotelList.length;



    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: slideShowCtn,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange, // 슬라이드 변경 전 호출되는 핸들러 추가
    };



    return (
        <div className="hotel--carousle--container">
            <Slider ref={sliderRef} {...settings}>
                {hotelList.map((hotel, index) => (
                    <div key={index} >
                        <a href="https://example.com">
                            <img src={`eventList/${hotel.image}`} alt={`슬라이드 ${index + 1}`} className="carousel-image" />
                            <div className="hotel--info--wrap">
                                <div className="hotel--info">
                                    <div>
                                        <span>{hotel.hotelRating}</span>
                                    </div>

                                    <div>
                                        <span>{hotel.hotelName}</span>
                                    </div>

                                    <div>
                                        <div className="review--wrap">
                                            <FaStar className='star--Icon' />
                                            <span><strong>{hotel.reviewAvg}</strong></span>
                                            <span>({hotel.reviewCnt})</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="hotel--price--wrap">
                                    {
                                        hotel.discount !== 0
                                            ? <><div className="hotel--discount--price--wrap">
                                                <span>{hotel.discount}%</span>
                                                <span>{hotel.oriPrice.toLocaleString()}원</span>
                                            </div>
                                                <strong>{hotel.discountPrice.toLocaleString()}원~</strong></>
                                            : <strong>{hotel.oriPrice.toLocaleString()}원~</strong>
                                    }

                                </div>
                            </div>

                        </a>
                    </div>
                ))}
            </Slider >

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
        </div >
    );
}