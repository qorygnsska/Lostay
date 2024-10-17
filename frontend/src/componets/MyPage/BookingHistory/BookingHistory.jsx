import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';


export default function BookingHistory({ booking }) {
    const state = ['예약 취소', '리뷰 작성']
    const [isOpen, setIsOpen] = useState(false);

    // 리뷰 쓰기 모달 창
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className='booking--history--component-container' >
            <div className='booking--info--wrap'>
                <div className='booking--info--paydate'>
                    <span>{booking.payDay}</span>
                    {
                        booking?.cancle ? ( // 취소내역 상세보기 링크
                            <Link to='/payment' state={{ paymentType: 'cancle', payNo: booking.payNo, roomNo: booking.roomNo }}>
                                <div className='booking--payment cancle'>
                                    <span>취소내역</span>
                                    <FaChevronRight />
                                </div>
                            </Link>) : ( //결제내역 상세보기 링크
                            <Link to='/payment' state={{ payNo: booking.payNo, roomNo: booking.roomNo }}>
                                <div className='booking--payment'>
                                    <span>결제내역</span>
                                    <FaChevronRight />
                                </div>
                            </Link>)
                    }
                </div>

                {/* 호텔 정보 */}
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
                    booking?.cancle ? null : (
                        <div className='booking--btn--wrap'>
                            {
                                booking?.review ? ( // 리뷰 작성 버튼 활성화
                                    booking.review === 'Y' ? (
                                        <button onClick={toggleModal}>
                                            <div className='booking--btn'>
                                                {state[1]}
                                            </div>
                                        </button>) : null
                                ) : (
                                    booking.roomCancle === 'Y' ? ( // 예약 취소 버튼 활성화
                                        <a href='https://www.example.com'>
                                            <div className='booking--btn' >
                                                {state[0]}
                                            </div>
                                        </a>) : null)
                            }
                        </div>)
                }
            </div>

            {/* 리뷰쓰기 모달 창 */}
            <div className='review--modal--wrap'>
                <ReviewModal isOpen={isOpen} onClose={toggleModal} hotelName={booking.hotelName} userNickname={booking.userNickname} />
            </div>
        </div>


    )
}
