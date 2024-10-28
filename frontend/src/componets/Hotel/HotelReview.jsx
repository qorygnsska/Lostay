import React from 'react'

import { FaStar } from "react-icons/fa";
import { GrNext } from "react-icons/gr";

export default function HotelReview({Reviews, HotelInfo}) {

    return (
        <div className='hotel--review--container'>
            <div className='ReviewBox'>
                <div className='StarDiv'>
                    <div className='Star'>
                        <FaStar className='StarIcon' />
                        <div className='StarNum'>{HotelInfo.reviewAvg}</div>
                    </div>
                    <span className='StarCount'>{HotelInfo.totalReviewCount}명 평가</span>
                    <GrNext />
                </div>

                <div className='ReviewWrap'>
                    {Reviews.map((review) => (
                        <div key={review.reviewNo} className='ContentBox'>
                            <div className='ReviewSD'>
                                <div className='ReviewStar'>
                                    <FaStar className='ReviewIcon' />
                                    <span>{review.reviewRating}</span>
                                </div>

                                <div className='ReviewDate'>
                                    {review.reviewCreateAt}
                                </div>
                            </div>

                            <div className='ReviewContent'>
                                {review.reviewContent}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
