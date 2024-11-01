import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';
import OkCancleModal from './OkCancleModal';
import PaymentModal from './PaymentModal';

// 날짜변경
const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
};

// 요일 구하기
const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay(); // 0(일요일) ~ 6(토요일)

    // 요일 이름 배열
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    return daysOfWeek[dayIndex]; // 요일 이름 반환
};

// 몇 박인지 구하기
const calculateNights = (checkInStr, checkOutStr) => {
    const checkInDate = new Date(checkInStr).toISOString().split('T')[0];
    const checkOutDate = new Date(checkOutStr).toISOString().split('T')[0];

    // Date 객체로 변환
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // 날짜 차이 계산 (밀리초 단위)
    const timeDiff = checkOut - checkIn;

    // 밀리초를 일 수로 변환
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    return daysDiff; // 몇 박인지 반환
};

// 시간 변환
const formatTime = (timeStr) => {
    return timeStr.substring(0, 5); // "15:00:00" -> "15:00"
};

export default function BookingHistory({ bookData, handlePaymentCancel, handleReviewUpdate }) {

    // 리뷰 쓰기 모달 창
    const [isReviewModal, setIsReviewModal] = useState(false);
    const reviewModalToggle = () => {
        setIsReviewModal(!isReviewModal);
    };

    // 예약 취소 모달 창
    const [isBookCancleModal, setIsBookCancleModal] = useState(false);

    const bookCancleModalToggle = () => {
        setIsBookCancleModal(!isBookCancleModal)
    }

    // 결제 내역, 취소 내역 모달 창
    const [isPaymentModal, setIsPaymentModal] = useState(false)

    const paymentCancleModalToggle = () => {
        setIsPaymentModal(!isPaymentModal)
    }

    const [paymentType, setPaymentType] = useState(null);

    const cancelOk = () => {
        handlePaymentCancel(bookData.payNo);
        bookCancleModalToggle();
    }

    const updateReview = (uploadImg, reviewRating, reviewContent) => {
        handleReviewUpdate(bookData.payNo, uploadImg, reviewRating, reviewContent);
        reviewModalToggle();
    }

    const canclePaymentClick = () => {
        paymentCancleModalToggle()
        setPaymentType('cancle')
    }

    const paymentClick = () => {
        paymentCancleModalToggle()
        setPaymentType(null)
    }

    return (

        <div className='booking--history--component-container' >
            <div className='booking--info--wrap'>
                <div className='booking--info--paydate'>
                    <span>결제일 : {formatDate(bookData.payDay)}</span>
                    {
                        bookData.isPayCancel ? ( // 취소내역 상세보기 링크

                            <div className='booking--payment cancle' onClick={canclePaymentClick}>
                                <span>취소내역</span>
                                <FaChevronRight />
                            </div>
                        ) : ( //결제내역 상세보기 링크

                            <div className='booking--payment' onClick={paymentClick}>
                                <span>결제내역</span>
                                <FaChevronRight />
                            </div>
                        )
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
                            <span>{formatDate(bookData.checkIn)} ({getDayName(bookData.checkIn)}) ~ {formatDate(bookData.checkOut)} ({getDayName(bookData.checkOut)}) | {calculateNights(bookData.checkIn, bookData.checkOut)}박</span>
                        </div>
                        <div className='booking--hotel--checktime'>
                            <span>체크인 {formatTime(bookData.roomCheckInTime)} | 체크아웃 {formatTime(bookData.roomCheckOutTime)}</span>
                        </div>
                    </div>
                </div>

                {
                    bookData.isPayCancel ? null : (
                        <div className='booking--btn--wrap'>
                            {
                                bookData.isWriteReview ? ( // 리뷰 작성 버튼 활성화
                                    bookData.isWriteReview ? (
                                        <button onClick={reviewModalToggle}>
                                            <div className='booking--btn'>
                                                <span>리뷰 작성</span>
                                            </div>
                                        </button>) : null
                                ) : (
                                    bookData.isRoomCancle ? ( // 예약 취소 버튼 활성화
                                        <button onClick={bookCancleModalToggle}>
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
                <ReviewModal show={isReviewModal} onClose={reviewModalToggle} hotelName={bookData.hotelName} userNickname={bookData.userNickname} updateReview={updateReview}
                    roomName={bookData.roomName} hotelThumbnail={bookData.hotelThumbnail} />
            </div>

            {/* 예약취소 모달 창 */}
            <OkCancleModal show={isBookCancleModal} onClose={bookCancleModalToggle} content={"예약을 취소하시겠습니까?"} cancelOk={cancelOk} />

            {/* 결제내역, 취소내역 모달 창 */}
            <PaymentModal show={isPaymentModal} onClose={paymentCancleModalToggle} bookData={bookData} checkInDayOfWeek={getDayName(bookData.checkIn)} checkOutDayOfWeek={getDayName(bookData.checkOut)}
                roomCheckInTime={formatTime(bookData.roomCheckInTime)} roomCheckOutTime={formatTime(bookData.roomCheckOutTime)} paymentType={paymentType}
            />
        </div>


    )
}
