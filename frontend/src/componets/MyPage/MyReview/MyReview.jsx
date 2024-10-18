import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import ImageModal from './ImageModal';

export default function MyReview({ reviewData }) {

    const ratingArray = [1, 2, 3, 4, 5]
    const [imageModalShow, setImageModalShow] = useState(false);
    const [selImgIdx, setSeImgIdx] = useState(0); // 선택한 이미지 인덱스

    const handleImageClick = (index) => {
        setSeImgIdx(index); // 선택한 이미지의 인덱스를 저장
        setImageModalShow(true); // 모달 열기
    };

    return (
        <div className='myreview--component--container'>
            <div className='myreview--wrap'>
                <div className='myreview--info'>
                    <div className='info--title'>
                        <span>{reviewData.hotelName}</span>
                    </div>

                    <div className='info--date'>
                        <span>{reviewData.date}</span>
                    </div>
                </div>

                <div className='myreview--rating'>
                    {
                        ratingArray.map((rate, idx) => {
                            return reviewData.rate >= rate ? <FaStar key={idx} className='icon--fill' /> : <FaStar key={idx} className='icon--empty' />
                        })
                    }
                </div>

                <div className='myreview--content'>
                    <p>{reviewData.content}</p>
                </div>


                {
                    reviewData.images.length > 0 ? (
                        <div className='myreview--image--wrap'>
                            {
                                reviewData.images.map((img, idx) => (
                                    <div className='myreview--image' key={idx} onClick={() => handleImageClick(idx)}>
                                        <img src={`eventList/${img}`} alt='리뷰 이미지' />
                                    </div>
                                ))}
                        </div>) : null
                }
            </div>

            <ImageModal imageModalShow={imageModalShow} onClose={() => setImageModalShow(false)} images={reviewData.images} initialIndex={selImgIdx} />
        </div>
    )
}
