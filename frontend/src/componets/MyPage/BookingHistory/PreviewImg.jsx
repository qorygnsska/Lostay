import React, { useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PreviewImg({ images, handleDeleteImage }) {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideShowCtn = 5
    const totalSlides = images.length;

    const handleBeforeChange = (current, next) => {
        setCurrentSlide(next);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: handleBeforeChange,
        draggable: totalSlides >= slideShowCtn
    };

    // 이미지 미리보기
    return (
        <div className='preview--img--container'>
            <div className='preview--img--box'>
                {totalSlides >= slideShowCtn ? (
                    <>
                        {/* 슬라이드 실행 */}
                        <Slider ref={sliderRef} {...settings}>
                            {images.map((img, idx) => (
                                <div className='img--box' key={idx}>
                                    <img src={img} alt='업로드 이미지' />
                                    <div className='icon--box' onClick={() => handleDeleteImage(idx)}>
                                        <IoClose className='icon' />
                                    </div>
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
                        <div className={`right--move--btn move--btn`}>
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
                            images.map((img, idx) => (
                                <div className='img--box' key={idx}>
                                    <img src={img} alt='업로드 이미지' />
                                    <div className='icon--box' onClick={() => handleDeleteImage(idx)}>
                                        <IoClose className='icon' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
                }
            </div>
        </div>
    )
}

