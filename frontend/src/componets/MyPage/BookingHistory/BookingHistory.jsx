import React from 'react'
import { FaChevronRight } from "react-icons/fa";

export default function BookingHistory({ booking }) {
    const state = ['예약 취소', '리뷰 작성', '리뷰 작성 완료']

    return (

        <div className='booking--history--component-container' >
            <div className='booking--info--wrap'>
                <div className='booking--info--paydate'>
                    <span>{booking.payDay}</span>
                    <a href='https://www.example.com'>
                        {booking?.cancle ? (
                            <div className='booking--payment cancle'>
                                <span>취소내역</span>
                                <FaChevronRight />
                            </div>
                        ) :
                            <div className='booking--payment'>
                                <span>결제내역</span>
                                <FaChevronRight />
                            </div>
                        }

                    </a>
                </div>

                <div className='booking--info--hotel'>

                    <img src={`HotelList/${booking.image}`} alt='호텔이미지' />


                    <div className='booking--info--content'>
                        <div className='booking--hotel--name'>
                            <span>{booking.hotelName}</span>
                        </div>

                        <div className='booking--hotel--checkday'>
                            <span>{booking.checkInDay} ~ {booking.checkOutDay} | 1박</span>
                        </div>
                        <div className='booking--hotel--checktime'>
                            <span>체크인 {booking.checkInTime} | 체크아웃 {booking.checkOutTime}</span>
                        </div>
                    </div>


                </div>

                {
                    booking?.cancle ? null :
                        <div className='booking--btn--wrap'>
                            {
                                booking?.review ?
                                    (
                                        booking.review === 'Y' ?
                                            <span>
                                                <div className='booking--btn noActive' >
                                                    {state[2]}
                                                </div>
                                            </span> :
                                            <a href='https://www.example.com'>
                                                <div className='booking--btn' >
                                                    {state[1]}
                                                </div>
                                            </a>
                                    ) :
                                    <a href='https://www.example.com'>
                                        <div className='booking--btn' >
                                            {state[0]}
                                        </div>
                                    </a>

                            }

                        </div>
                }
            </div>
        </div>
    )
}
