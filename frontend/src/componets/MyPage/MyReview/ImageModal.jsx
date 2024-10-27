import React, { useEffect, useState } from 'react'
import { Modal, Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import ReviewCarousel from '../../Carousel/ReviewCarousel';

export default function ImageModal({ imageModalShow, onClose, images, initialIndex }) {

    const [index, setIndex] = useState(initialIndex);

    useEffect(() => {
        setIndex(initialIndex); // 모달이 열릴 때 초기 인덱스 설정
    }, [initialIndex, imageModalShow]); // 모달 열기/닫기 시 인덱스 업데이트


    const handleImageSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Modal
            show={imageModalShow}
            className='myreview--modal--container'
            onHide={onClose}
            fullscreen={true}
        >
            {/* 모달 내용 추가 */}
            <Modal.Header closeButton>
            </Modal.Header>

            {/* 메인 이미지 캐러셀 */}
            <Carousel
                activeIndex={index}
                onSelect={handleImageSelect}
                controls={true}
                indicators={false} // 도트 제거
                interval={null} // 자동 전환 끄기
            >
                {images.map((img, index) => (
                    <Carousel.Item key={index}>
                        <img src={img} alt={`Main Image ${index}`} className='main--image' />
                        <div className="image--counter">
                            {index + 1} / {images.length}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* 썸네일 이미지 리스트 */}
            <div className="thumbnail-container">
                <ReviewCarousel images={images} handleImageSelect={handleImageSelect} isModal={true} propIndex={index} />
            </div>

            {/*             
            <div className="thumbnail-container">
                {images.map((img, idx) => (
                    <div key={idx} onClick={() => setIndex(idx)} className="thumbnail--box" >
                        <img src={`eventList/${img}`} alt={`Thumbnail ${idx}`} className={`thumbnail-image ${index === idx ? 'sel--border' : ''}`} />
                    </div>
                ))}
            </div> */}
        </Modal>
    );
}