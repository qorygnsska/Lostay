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
                        <div className='StarNum'>{HotelInfo.starAvg}</div>
                    </div>
                    <span className='StarCount'>{HotelInfo.reviewCount}명 평가</span>
                    <GrNext />
                </div>

                <div className='ReviewWrap'>
                    {Reviews.map((review) => (
                        <div key={review.id} className='ContentBox'>
                            <div className='ReviewSD'>
                                <div className='ReviewStar'>
                                    <FaStar className='ReviewIcon' />
                                    <span>{review.rank}</span>
                                </div>

                                <div className='ReviewDate'>
                                    {review.date}
                                </div>
                            </div>

                            <div className='ReviewContent'>
                                {review.content}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
