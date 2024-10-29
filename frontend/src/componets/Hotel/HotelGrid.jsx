import React from 'react'

import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function HotelGrid({ hotels }) {
    return (
        <div className='hotel--grid--container'>
            <div className='HotelGrid'>

                {hotels.map((hotel) => (
                    <Link className='link_to_roomList' to={`../roomList/${hotel.hotelNo}`} >
                        <div className='HotelRow' key={hotel.id}>
                            <div className='HotelCol'>
                                <img src={'../' + hotel.hotelThumbnail} alt='호텔이미지' className='HotelImg' />
                                <div className='HotelInfo'>
                                    <div className='HotelRank'>{hotel.hotelRating}</div>
                                    <div className='HotelName'>{hotel.hotelName}</div>
                                    <div className='StarDiv'>
                                        <div className='Star'>
                                            <FaStar className='StarIcon' />
                                            <div className='StarNum'>{hotel.reviewRating?.toFixed(1)}</div>
                                        </div>
                                        <span className='StarCount'>{hotel.totalReviewCount}명 평가</span>
                                    </div>
                                </div>
                                <div className='HotelPrice'>
                                    {hotel.roomDiscount > 0 ? (
                                        <>
                                            <div className='RealPrice'>{hotel.roomPrice.toLocaleString()}원</div>
                                            <div className='HotelDiscount'>
                                                <div className='Discount'>{hotel.roomDiscount}%</div>
                                                <div className='DiscountPrice'>{hotel.roomDcPrice.toLocaleString()}원</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='HotelDiscount'>
                                                <div className='Discount' style={{ visibility: 'hidden' }}>{hotel.roomDiscount}%</div>
                                                <div className='DiscountPrice'>{hotel.roomDcPrice.toLocaleString()}원</div>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </div>
                            <div className='RowLine'></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
