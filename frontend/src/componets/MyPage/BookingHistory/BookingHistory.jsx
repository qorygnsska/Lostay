import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';
import OkCancleModal from './OkCancleModal';



export default function BookingHistory({ bookData, handlePaymentCancel, handleReviewUpdate }) {
    const [isOpen, setIsOpen] = useState(false);

    // 리뷰 쓰기 모달 창
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // 예약 취소 모달 창
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cancelOk = () => {
        handlePaymentCancel(bookData.payNo);
        setShow(false);
    }

    const updateReview = (uploadImg, reviewRating, reviewContent) => {
        handleReviewUpdate(bookData.payNo, uploadImg, reviewRating, reviewContent);
    }

    return (

        <div className='booking--history--component-container' >
            <div className='booking--info--wrap'>
                <div className='booking--info--paydate'>
                    <span>결제일 : {bookData.payDay}</span>
                    {
                        bookData.isPayCancel ? ( // 취소내역 상세보기 링크
                            <Link to='/payment' state={{
                                paymentType: 'cancle', payNo: bookData.payNo, payDay: bookData.payDay,
                                hotelThumbnail: bookData.hotelThumbnail,
                                roomCheckInTime: bookData.roomCheckInTime, roomCheckOutTime: bookData.roomCheckOutTime,
                                checkInDate: bookData.checkInDate, checkOutDate: bookData.checkOutDate,
                                checkInDayOfWeek: bookData.checkInDayOfWeek, checkOutDayOfWeek: bookData.checkOutDayOfWeek,
                                nights: bookData.nights
                            }}>
                                <div className='booking--payment cancle'>
                                    <span>취소내역</span>
                                    <FaChevronRight />
                                </div>
                            </Link>) : ( //결제내역 상세보기 링크
                            <Link to='/payment' state={{
                                payNo: bookData.payNo, payDay: bookData.payDay,
                                hotelThumbnail: bookData.hotelThumbnail,
                                roomCheckInTime: bookData.roomCheckInTime, roomCheckOutTime: bookData.roomCheckOutTime,
                                checkInDate: bookData.checkInDate, checkOutDate: bookData.checkOutDate,
                                checkInDayOfWeek: bookData.checkInDayOfWeek, checkOutDayOfWeek: bookData.checkOutDayOfWeek,
                                nights: bookData.nights
                            }}>
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
                                    bookData.isWriteReview ? (
                                        <button onClick={toggleModal}>
                                            <div className='booking--btn'>
                                                <span>리뷰 작성</span>
                                            </div>
                                        </button>) : null
                                ) : (
                                    bookData.isRoomCancle ? ( // 예약 취소 버튼 활성화
                                        <button onClick={handleShow}>
                                            <div className='booking--btn' >
                                                <span>예약 취소</span>
                                            </div>
                                        </button>) : null)
                            }
                        </div>)
                }
            </div>

            {/* 리뷰쓰기 모달 창 */}
            <div className='review--modal--wrap'>
                <ReviewModal isOpen={isOpen} onClose={toggleModal} hotelName={bookData.hotelName} userNickname={bookData.userNickname} updateReview={updateReview} />
            </div>

            {/* 예약취소 모달 창 */}
            <OkCancleModal show={show} handleClose={handleClose} content={"예약을 취소하시겠습니까?"} cancelOk={cancelOk} />
        </div>


    )
}
