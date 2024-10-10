import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './EventCarousel.css'

export default function Carousel({ images }) {

    const sliderRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = images.length;

    const handlePlayPause = () => {
        if (isPlaying) {
            sliderRef.current.slickPause();
        } else {
            sliderRef.current.slickPlay();
        }
        setIsPlaying(!isPlaying);
    };

    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        beforeChange: handleBeforeChange,
    };



    return (
        <div>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`eventList/${image}`} alt={`슬라이드 ${index + 1}`} />
                    </div>
                ))}
            </Slider>

            <div>
                <button onClick={handlePlayPause}>
                    {isPlaying ? '정지' : '재생'}
                </button>
                <button onClick={() => sliderRef.current.slickPrev()}>
                    <FaChevronLeft />
                </button>
                <span>
                    {currentSlide + 1} / {totalSlides} {/* 현재 슬라이드와 총 슬라이드 수 표시 */}
                </span>
                <button onClick={() => sliderRef.current.slickNext()}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}