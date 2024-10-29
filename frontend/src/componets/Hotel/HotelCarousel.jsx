import React, { useEffect, useState } from 'react'

import Carousel from 'react-bootstrap/Carousel';
import ReImgModal from '../HotelReview/ReImgModal';

export default function HotelCarousel({images}) {

    const [ImgIdx, setImgIdx] = useState(0); // 이미지 인덱스

    // 사진 전체보기 캐러셀
    const handleImageClick = (idx) => {
        setImgIdx(idx); // 선택한 이미지의 인덱스를 저장
        setShow(true); // 모달 열기
    };

    // 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div className='hotel--carousel--container'>
            <Carousel indicators={false}>
                {images.map((image, idx) => (
                    <Carousel.Item key={idx}>
                    <img src={'../../../../' + image} alt='호텔이미지' className='HotelImg' onClick={() => handleImageClick(idx)}/>
                    <div className="image--counter">
                        {idx + 1} / {images.length}
                    </div>
                </Carousel.Item>
                ))}
                
                
            </Carousel>

            <ReImgModal imgs={images} show={show} ImgIdx={ImgIdx} handleClose={handleClose}/>
        </div>
    )
}
