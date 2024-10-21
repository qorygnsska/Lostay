import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CardCarousel({ hotelList }) {

    // 슬라이드 설정
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideShowCtn = 3
    const totalSlides = hotelList.length;

    // 현재 슬라이드 위치 저장
    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    // 슬라이드 셋팅 값 설정
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: slideShowCtn,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange,
    };



    return (
        <div className="hotel--carousle--container">

            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {hotelList.map((hotel) => (
                    <div key={hotel.hotelNo} >
                        <Link to="/hotelList" className="link">
                            {/* 호텔 정보 */}
                            <img src={`${hotel.hotelThumbnail}`} alt={`슬라이드 ${hotel.hotelNo + 1}`} className="carousel-image" />
                            <div className="hotel--info--wrap">
                                <div className="hotel--info">
                                    <div>
                                        <span>{hotel.hotelRating ? `${hotel.hotelRating} · 호텔 ` : '호텔'}</span>
                                    </div>

                                    <div className="hotel--name">
                                        <span>{hotel.hotelName}</span>
                                    </div>

                                    <div>
                                        <div className="review--wrap">
                                            <div className="review--icon--box">
                                                <FaStar className='star--Icon' />
                                                <span className="review--avg"><strong>{hotel.reviewAvg ? hotel.reviewAvg : 0}</strong></span>
                                            </div>

                                            <span className="hotel--review--count">{hotel.totalReviewCount}명 평가</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 호텔 가격 */}
                                <div className="hotel--price--wrap">
                                    {
                                        hotel.discount !== 0 ? ( // 호텔 세일일 때
                                            <>
                                                <div className="hotel--discount--price--wrap">
                                                    <span className="hotel--room--discount">{hotel.roomDiscount}%</span>
                                                    <span className="hotel--room--price">{hotel.roomPrice.toLocaleString()}원</span>
                                                </div>
                                                <strong>{hotel.roomDcPrice.toLocaleString()}원~</strong>
                                            </>) : ( // 호텔 세일 아닐 때
                                            <strong>{hotel.roomPrice.toLocaleString()}원~</strong>)
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
                }
            </Slider >

            {/* 슬라이드 좌우 버튼 */}
            < div className="left--move--btn move--btn" >
                {currentSlide > 0
                    ? <button onClick={() => sliderRef.current.slickPrev()} className="arrow-button">
                        <FaChevronLeft className="arrow" />
                    </button>
                    : <div></div>
                }
            </div >
            <div className="right--move--btn move--btn">
                {currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                    <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                        <FaChevronRight className="arrow" />
                    </button>
                )}
            </div>
        </div >
    );
}