import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';


export default function BookingHistory({ bookData }) {
    const [isOpen, setIsOpen] = useState(false);

    // 리뷰 쓰기 모달 창
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className='booking--history--component-container' >
            <div className='booking--info--wrap'>
                <div className='booking--info--paydate'>
                    <span>결제일 : {bookData.payDay}</span>
                    {
                        bookData.isPayCancel ? ( // 취소내역 상세보기 링크
                            <Link to='/payment' state={{ paymentType: 'cancle', payNo: bookData.payNo, roomNo: bookData.roomNo }}>
                                <div className='booking--payment cancle'>
                                    <span>취소내역</span>
                                    <FaChevronRight />
                                </div>
                            </Link>) : ( //결제내역 상세보기 링크
                            <Link to='/payment' state={{ payNo: bookData.payNo, roomNo: bookData.roomNo }}>
                                <div className='booking--payment'>
                                    <span>결제내역</span>
                                    <FaChevronRight />
                                </div>
                            </Link>)
                    }
                </div>

                {/* 호텔 정보 */}
                <div className='booking--info--hotel'>
                    <img src={bookData.hotelThumbnail} alt='호텔이미지' />

                    <div className='booking--info--content'>
                        <div className='booking--hotel--name'>
                            <span>{bookData.hotelName}</span>
                        </div>

                        <div className='booking--hotel--checkday'>
                            <span>{bookData.checkInDate} {bookData.checkInDayOfWeek} ~ {bookData.checkOutDate} {bookData.checkOutDayOfWeek} | {bookData.nights}</span>
                        </div>
                        <div className='booking--hotel--checktime'>
                            <span>체크인 {bookData.roomCheckInTime} | 체크아웃 {bookData.roomCheckOutTime}</span>
                        </div>
                    </div>
                </div>

                {
                    bookData.isPayCancel ? null : (
                        <div className='booking--btn--wrap'>
                            {
                                bookData.isWriteReview ? ( // 리뷰 작성 버튼 활성화
                                    bookData.isWriteReview === 'Y' ? (
                                        <button onClick={toggleModal}>
                                            <div className='booking--btn'>
                                                <span>리뷰 작성</span>
                                            </div>
                                        </button>) : null
                                ) : (
                                    bookData.isRoomCancle === 'Y' ? ( // 예약 취소 버튼 활성화
                                        <a href='https://www.example.com'>
                                            <div className='booking--btn' >
                                                <span>예약 취소</span>
                                            </div>
                                        </a>) : null)
                            }
                        </div>)
                }
            </div>

            {/* 리뷰쓰기 모달 창 */}
            <div className='review--modal--wrap'>
                <ReviewModal isOpen={isOpen} onClose={toggleModal} hotelName={bookData.hotelName} userNickname={bookData.userNickname} />
            </div>
        </div>


    )
}
