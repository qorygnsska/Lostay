import React from 'react'

import { FaStar } from "react-icons/fa6";

export default function HotelGrid({hotels}) {
  return (
    <div className='hotel--grid--container'>
        <div className='HotelGrid'>
            {/* 반복문 예시 */}
            {/* {hotels.map((hotel) => (
            <div className='HotelRow' key={hotel.id 호텔 넘버}>
                <div className='HotelCol'>
                <img src={hotel.image 호텔 이미지} className='HotelImg' />
                <div className='HotelInfo'>
                    <div className='HotelRank'>{hotel.rank 호텔 몇성}</div>
                    <div className='HotelName'>{hotel.name 호텔 이름}</div>
                    <div className='HotelLo'>{hotel.location 호텔 주소(시만)}</div>
                    <div className='StarDiv'>
                    <div className='Star'>
                        <FaStar className='StarIcon' />
                        <div className='StarNum'>{hotel.rating 호텔 별점}</div>
                    </div>
                    <span className='StarCount'>{hotel.reviews 호텔 리뷰 수}명 평가</span>
                    </div>
                </div>
                <div className='HotelPrice'>
                    <div className='RealPrice'>{hotel.originalPrice 호텔 원래 가격}</div>
                    <div className='HotelDiscount'>
                    <div className='Discount'>{hotel.discountRate 호텔 할인률}</div>
                    <div className='DiscountPrice'>{hotel.discountedPrice 호텔 할인된 가격}</div>
                    </div>
                </div>
                </div>
                <div className='RowLine'></div>
            </div>
            ))} */}

            {hotels.map((hotel) => (
                <div className='HotelRow' key={hotel.id}>
                    <div className='HotelCol'>
                    <img src={hotel.image} alt='호텔이미지' className='HotelImg' />
                    <div className='HotelInfo'>
                        <div className='HotelRank'>{hotel.rank}</div>
                        <div className='HotelName'>{hotel.name}{hotel.id}</div>
                        <div className='HotelLo'>{hotel.location}</div>
                        <div className='StarDiv'>
                        <div className='Star'>
                            <FaStar className='StarIcon' />
                            <div className='StarNum'>{hotel.rating}</div>
                        </div>
                        <span className='StarCount'>{hotel.reviews}명 평가</span>
                        </div>
                    </div>
                    <div className='HotelPrice'>
                        <div className='RealPrice'>{hotel.originalPrice}</div>
                        <div className='HotelDiscount'>
                        <div className='Discount'>{hotel.discountRate}</div>
                        <div className='DiscountPrice'>{hotel.discountedPrice}</div>
                        </div>
                    </div>
                    </div>
                    <div className='RowLine'></div>
                </div>
            ))}
        </div>
    </div>
  )
}
