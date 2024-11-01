import React from 'react'

import { FaStar } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

export default function HotelReview({Reviews, HotelInfo}) {

    return (
        <div className='hotel--review--container'>
            <div className='ReviewBox'>
                <div className='StarDiv'>
                    <div className='Star'>
                        <FaStar className='StarIcon' />
                        <div className='StarNum'>{HotelInfo.reviewAvg?.toFixed(1)}</div>
                    </div>
                    <Link to={`/hotelReviews/${HotelInfo.hotelNo}/0`} className='StarCount'><span >{HotelInfo.totalReviewCount}명 평가 <GrNext /></span></Link>
                </div>

                <div className='ReviewWrap'>
                    {Reviews.map((review, idx) => (
                        <Link to={`/hotelReviews/${HotelInfo.hotelNo}/0`} className='LinkBox' key={idx}>
                        <div key={review.reviewNo} className='ContentBox'>
                            <div className='ReviewSD'>
                                <div className='ReviewStar'>
                                    <FaStar className='ReviewIcon' />
                                    <span>{review.reviewRating.toFixed(1)}</span>
                                </div>

                                <div className='ReviewDate'>
                                    {review.reviewCreateAt.slice(0, 10)}
                                </div>
                            </div>

                            <div className='ReviewContent'>
                                {review.reviewContent}
                            </div>

                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
