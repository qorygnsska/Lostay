import React from 'react'
import { FaStar } from "react-icons/fa6";

export default function WishList({ hotel }) {
    return (
        <div className='wishList--component--container'>
            <a href='ex.com'>
                <div className='wishList--wrap'>
                    <img src={`eventList/${hotel.image}`} alt={`hotel`} />

                    <div className='wishList--box'>
                        <div className='hotel--info'>
                            <div>
                                <span>{hotel.hotelRating}</span>
                            </div>

                            <div>
                                <span>{hotel.hotelName}</span>
                            </div>

                            <div className='review--wrap'>
                                <FaStar className='star--Icon' />
                                <span><strong>{hotel.reviewAvg}</strong></span>
                                <span>({hotel.reviewCnt})</span>
                            </div>
                        </div>

                        <div className="hotel--price--wrap">
                            {
                                hotel.discount !== 0
                                    ? <div className="hotel--discount--price--wrap">
                                        <span>{hotel.discount}%</span>
                                        <span>{hotel.discountPrice}원</span>
                                    </div>
                                    : null
                            }
                            <strong>{hotel.oriPrice}원~</strong>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}
