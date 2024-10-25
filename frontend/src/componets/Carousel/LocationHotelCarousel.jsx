import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function LocationHotelCarousel({ locationHotelList }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0); // 추가된 상태
    const slideShowCtn = 1;
    const totalSlides = locationHotelList.length;

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
        speed: 100,
        beforeChange: handleBeforeChange,
    };

    return (
        <div className="location--hotel--carousle--container">
            {/* 광역시별 버튼 */}
            <ul className="location--name--list">
                {locationHotelList.map((locationHotel, index) => (
                    <li key={index}>
                        <button className={activeIndex === index ? "active" : ""} onClick={() => handleButtonClick(index)}>
                            {locationHotel.location}
                        </button>
                    </li>
                ))}
            </ul>

            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {locationHotelList.map((locationHotel, metropolitanHotelIndex) => (
                    <div key={metropolitanHotelIndex} className="hotel--list--wrap">
                        {/* 호텔 정보 */}
                        {locationHotel.hotelList.map((hotel, hotelIndex) => (
                            <a key={hotelIndex} href="ex.com">
                                <div className="hotel--list--info">
                                    <img src={`${hotel.hotelThumbnail}`} alt={`슬라이드`} className="carousel-image" />
                                    <div className="hotel--info--wrap">
                                        <div className="hotel--info">
                                            <div>
                                                <span className="hotel--rating">{hotel.hotelRating ? `${hotel.hotelRating} · 호텔 ` : "호텔"}</span>
                                            </div>
                                            <div className="hotel--name">
                                                <span>{hotel.hotelName}</span>
                                            </div>
                                            <div>
                                                <div className="review--wrap">
                                                    <div className="review--icon--box">
                                                        <span>
                                                            <FaStar className="star--Icon" />
                                                        </span>
                                                        <span className="review--avg">
                                                            <strong>{hotel.reviewAvg ? hotel.reviewAvg : 0}</strong>
                                                        </span>
                                                    </div>

                                                    <span className="hotel--review--count">{hotel.totalReviewCount}명 평가</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 호텔 가격 */}
                                        <div className="hotel--price--wrap">
                                            {hotel.discount !== 0 ? ( // 호텔 세일일 때
                                                <>
                                                    <div className="hotel--discount--price--wrap">
                                                        <span className="hotel--room--discount">{hotel.roomDiscount}%</span>
                                                        <span className="hotel--room--price">{hotel.roomPrice.toLocaleString()}원</span>
                                                    </div>
                                                    <strong>{hotel.roomDcPrice.toLocaleString()}원~</strong>
                                                </> // 호텔 세일 아닐 때
                                            ) : (
                                                <strong>{hotel.roomPrice.toLocaleString()}원~</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </Slider>

            {/* 슬라이드 좌우 버튼 */}
            <div className="left--move--btn move--btn">
                {currentSlide > 0 ? (
                    <button onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                        <FaChevronLeft className="arrow" />
                    </button>
                ) : (
                    <div></div>
                )}
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
