import React from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';
import MyReviewComponent from '../../../componets/MyPage/MyReview/MyReview'
import { BsChatText } from "react-icons/bs";

export default function MyReview() {


    const reviewList = {
        totalReview: 2,
        reviews: [
            {
                hotelName: '신신호텔 제주 서귀포', rate: 5, date: '2024-11-02',
                content: '발렛파킹도 해주시고\n객실업그레이듣 해주셔서 정말 편이 있다갑니다.\n너무 깨끗하고 직원들도 친절하세요~~^^',
                images: []
            },
            {
                hotelName: '세인트존스 호텔', rate: 3, date: '2024-11-03',
                content: '방도 깨끗하고 좋았지만\n방음이 안돼서 시끄러웠습니다.',
                images: ['2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', '2e8d99db81c7bde9a4f9cb703b0d7e52.webp']
            },
        ]
    }

    return (
        <div className='my--review--container'>
            <div>
                <BackNav title='내 리뷰' />
            </div>

            <div className='my--review--wrap'>
                {/* 작성한 리뷰 개수 */}
                <div className='review--total'>
                    <span>작성한 리뷰 <span className='review--total--cnt'>{reviewList.totalReview}</span>개</span>
                </div>


                {
                    reviewList.totalReview > 0 ? (reviewList.reviews.map((reviewData, idx) => (// 리뷰가 있을 때
                        <MyReviewComponent reviewData={reviewData} key={idx} />)))
                        : ( // 리뷰가 없을 때
                            <div className='reviews'>
                                <div>
                                    <BsChatText className='icon' />
                                </div>

                                <div className='review--none--text'>
                                    <span>작성한 리뷰가 없습니다.</span>
                                    <span>상품 이용 후 소중한 후기를 남겨주세요.</span>
                                </div>

                            </div>
                        )
                }
            </div>


            <div>
                <Navbar />
            </div>
        </div>
    )
}
