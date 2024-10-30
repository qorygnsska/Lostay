import React, { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap';

export default function ReImgModal({imgs, ImgIdx, show, handleClose}) {

  
  const [Idx, setImgIdx] = useState(); // 이미지 인덱스

  useEffect(() => {
      setImgIdx(ImgIdx); // 모달이 열릴 때 초기 인덱스 설정
  }, [ImgIdx, show]); // 모달 열기/닫기 시 인덱스 업데이트


  const handleSelect = (selectedIndex) => {
    setImgIdx(selectedIndex);
  };


  return (
    
      <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} className='reviews--modal--container'>
                <Modal.Header closeButton></Modal.Header>

                <Carousel
                    activeIndex={Idx}
                    onSelect={handleSelect}
                    controls={true}
                    indicators={false} // 도트 제거
                    interval={null} // 자동 전환 끄기
                >
                    {imgs.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img src={'../../' + img} alt={index} className='main--image' />
                            <div className="image--counter">
                                {index + 1} / {imgs.length}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* 썸네일 이미지 리스트 */}
                <div className="thumbnail-container">
                    {imgs.map((img, index) => (
                        <div key={index} onClick={() => setImgIdx(index)} className="thumbnail--box" >
                            <img src={'../../' + img} alt={index} className={`thumbnail-image ${Idx === index ? 'sel--border' : ''}`} />
                        </div>
                    ))}
                </div>
            </Modal>
    
  )
}
