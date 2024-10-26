import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import ImageModal from './ImageModal';
import ReviewCarousel from '../../Carousel/ReviewCarousel';

export default function MyReview({ review }) {

    const ratingArray = [1, 2, 3, 4, 5]
    const [imageModalShow, setImageModalShow] = useState(false);
    const [selImgIdx, setSeImgIdx] = useState(0); // 선택한 이미지 인덱스

    const handleImageSelect = (index) => {
        setSeImgIdx(index); // 선택한 이미지의 인덱스를 저장
        setImageModalShow(true); // 모달 열기
    };

    // 날짜변경
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    return (
        <div className='myreview--component--container'>
            <div className='myreview--wrap'>
                <div className='myreview--info'>
                    <div className='info--title'>
                        <span>{review.roomName}</span>
                    </div>

                    <div className='info--date'>
                        <span>{formatDate(review.reviewCreateAt)}</span>
                    </div>
                </div>

                <div className='myreview--rating'>
                    {
                        ratingArray.map((rate, idx) => {
                            return review.reviewRating >= rate ? <FaStar key={idx} className='icon--fill' /> : <FaStar key={idx} className='icon--empty' />
                        })
                    }
                </div>

                <div className='myreview--content'>
                    <p>{review.reviewContent}</p>
                </div>


                {
                    review.reviewImg ? (<ReviewCarousel images={review.reviewImg} handleImageSelect={handleImageSelect} />) : null
                }
            </div>

            {
                review.reviewImg ? <ImageModal imageModalShow={imageModalShow} onClose={() => setImageModalShow(false)} images={review.reviewImg} initialIndex={selImgIdx} />
                    : null
            }

        </div>
    )
}
