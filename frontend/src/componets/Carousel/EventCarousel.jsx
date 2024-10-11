import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdPause, IoMdPlay } from "react-icons/io";
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
        <div className="event--carousel--container">
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <a href="#">
                            <img src={`eventList/${image}`} alt={`슬라이드 ${index + 1}`} />
                        </a>
                    </div>
                ))}
            </Slider>

            <div className="event--btn--wrap">
                <div className="event--btn--box">
                    <button onClick={handlePlayPause}>
                        {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                    </button>

                    <span className="">

                    </span>

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