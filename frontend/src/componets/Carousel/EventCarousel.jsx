import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdPause, IoMdPlay } from "react-icons/io";

export default function Carousel({ images }) {

    // 슬라이드 설정
    const sliderRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = images.length;

    // 자동 플레이 버튼 설정
    const handlePlayPause = () => {
        if (isPlaying) {
            sliderRef.current.slickPause();
        } else {
            sliderRef.current.slickPlay();
        }
        setIsPlaying(!isPlaying);
    };

    // 현재 슬라이드 위치 저장
    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    // 슬라이드 셋팅 값 설정
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        beforeChange: handleBeforeChange,
    };



    return (
        <div className="event--carousel--container">

            {/* 슬라이드 실행 */}
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <a href="https://example.com">
                            <img src={`eventList/${image}`} alt={`슬라이드 ${index + 1}`} />
                        </a>
                    </div>
                ))}
            </Slider>

            {/* 슬라이드 좌우 버튼 */}
            <div className="event--btn--wrap">
                <div className="event--btn--box">
                    <button onClick={handlePlayPause}>
                        {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                    </button>

                    <span className=""></span>

                    <button onClick={() => sliderRef.current.slickPrev()}>
                        <FaChevronLeft />
                    </button>

                    <span>
                        <strong>{currentSlide + 1}</strong> / {totalSlides}
                    </span>

                    <button onClick={() => sliderRef.current.slickNext()}>
                        <FaChevronRight />
                    </button>
                </div>

            </div>
        </div>
    );
}