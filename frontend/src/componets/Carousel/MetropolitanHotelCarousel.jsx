import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function MetropolitanHotelCarousel({ metropolitanHotelList }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0); // 추가된 상태
    const slideShowCtn = 1;
    const totalSlides = metropolitanHotelList.length;


    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
        setActiveIndex(next);
    };

    const handleButtonClick = (index) => {
        setActiveIndex(index); // 활성화된 버튼 인덱스 업데이트
        const slideIndex = index; // 슬라이드 인덱스 계산
        sliderRef.current.slickGoTo(slideIndex); // 슬라이드로 이동
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: slideShowCtn,
        slidesToScroll: slideShowCtn,
        arrows: false,
        beforeChange: handleBeforeChange,
    };

    return (
        <div className="metropolitan--hotel--carousle--container">

            {/* 광역시별 버튼 */}
            <ul className="metroplitan--name--list">
                {metropolitanHotelList.map((metropolitan, index) => (
                    <li key={index}>
                        <button
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleButtonClick(index)}
                        >
                            {metropolitan.metropolitan}
                        </button>
                    </li>
                ))}
            </ul>

            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {metropolitanHotelList.map((metropolitanHotel, metropolitanHotelIndex) =>
                    <div key={metropolitanHotelIndex} className="hotel--list--wrap">

                        {/* 호텔 정보 */}
                        {metropolitanHotel.hotelList.map((hotel, hotelIndex) => (
                            <a key={hotelIndex} href="ex.com">
                                <div className="hotel--list--info">
                                    <img src={`eventList/${hotel.image}`} alt={`슬라이드`} className="carousel-image" />
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

                                        {/* 호텔 가격 */}
                                        <div className="hotel--price--wrap">
                                            {
                                                hotel.discount !== 0 ? ( // 호텔 세일일 때
                                                    <>
                                                        <div className="hotel--discount--price--wrap">
                                                            <span>{hotel.discount}%</span>
                                                            <span>{hotel.oriPrice.toLocaleString()}원</span>
                                                        </div>
                                                        <strong>{hotel.discountPrice.toLocaleString()}원~</strong>
                                                    </>) : ( // 호텔 세일 아닐 때
                                                    <strong>{hotel.oriPrice.toLocaleString()}원~</strong>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </a>))}
                    </div>
                )}
            </Slider>

            {/* 슬라이드 좌우 버튼 */}
            <div className="moveBtn">
                {
                    currentSlide > 0 ? (
                        <button onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                            <FaChevronLeft className="arrow" />
                        </button>) : <div></div>
                }
                {
                    currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                        <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                            <FaChevronRight className="arrow" />
                        </button>)
                }
            </div>
        </div>
    );
}
