import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ReviewCarousel({ images, handleImageSelect, isModal, propIndex }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideShowCtn = 8
    const totalSlides = images.length;

    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange,
        draggable: totalSlides >= slideShowCtn
    };
    useEffect(() => {
        if (isModal && propIndex) {
            const slideIndex = Math.floor(propIndex / slideShowCtn) * slideShowCtn;
            if (currentSlide !== slideIndex) {
                sliderRef.current.slickGoTo(slideIndex);
            }
        }
    }, [propIndex, isModal, currentSlide, slideShowCtn]);

    return (
        <div className="review--carousel--container">
            {totalSlides >= slideShowCtn ? (
                <>
                    {/* 슬라이드 실행 */}
                    <Slider ref={sliderRef} {...settings}>
                        {images.map((image, index) => (
                            <div className="image--box" onClick={() => handleImageSelect(index)}>
                                <img src={image} alt={`슬라이드 ${index + 1}`} className={`${isModal && propIndex === index && "isSelect"}`} />
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
                    <div className={`right--move--btn move--btn ${isModal && "isModal--btn"}`}>
                        {currentSlide < totalSlides - slideShowCtn && ( // slidesToShow 수에 따라 조정
                            <button onClick={() => sliderRef.current.slickNext()} className="arrow-button">
                                <FaChevronRight className="arrow" />
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className='default--image--wrap'>
                    {
                        images.map((image, index) => (
                            <div className="image--box" onClick={() => handleImageSelect(index)}>
                                <img src={image} alt={`슬라이드 ${index + 1}`} className={`${isModal && propIndex === index && "isSelect"}`} />
                            </div>
                        ))
                    }
                </div>
            )
            }

        </div>
    )
}
