import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { PiCopyBold } from "react-icons/pi";
import Toast from "../../../componets/Toast/Toast";
import { privateApi } from '../../../api/api'
import { HiOutlineXMark } from "react-icons/hi2";

export default function PaymentModal({ show, onClose, bookData, checkInDayOfWeek, checkOutDayOfWeek, roomCheckInTime, roomCheckOutTime, paymentType }) {


    const [toast, setToast] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const getDatas = async () => {

        try {
            const response = await privateApi.get(`/payment/History?payNo=${bookData.payNo}`); // API 요청
            console.log(response.data)
            setPaymentData(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);


    // 주소 복사
    const handleCopyClipBoard = async (address) => {
        try {
            await navigator.clipboard.writeText(address);
            setToast(true);
        } catch (e) {
            console.error("Failed to copy to clipboard", e);
        }
    };

    // 날짜변경
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };


    return (
        <Modal
            show={show}
            className='payment--modal--container'
            onHide={onClose}
            fullscreen={true}
        >

            <div className="payment--container">

                {/* 모달 내용 추가 */}
                <div className='header'>
                    {paymentType ? "취소 내역" : "결제 내역"}
                    <HiOutlineXMark className='xmark' onClick={onClose} />
                </div>
                {/* 예약한 호텔 정보 */}
                <div className="payment--wrap">
                    <div className="booking--hotel--info">
                        <img src={bookData.hotelThumbnail} alt="호텔 이미지" />

                        <div className="hotel--info--box">
                            <div className="hotel--name">
                                <span>{paymentData?.hotelName}</span>
                            </div>

                            <div className="hotel--content">
                                <span>{paymentData?.hotelAddress}</span>
                                <button
                                    onClick={() =>
                                        handleCopyClipBoard(paymentData.hotelAddress)
                                    }
                                >
                                    <PiCopyBold className="icon" /> 주소 복사
                                </button>
                            </div>

                            <div className="hotel--content">
                                <span>
                                    {formatDate(bookData.checkIn)} ({checkInDayOfWeek}) ~ {formatDate(bookData.checkOut)} ({checkOutDayOfWeek}) | {bookData.nights}
                                </span>
                            </div>

                            <div className="hotel--content">
                                <span>체크인 {roomCheckInTime} | 체크아웃 {roomCheckOutTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* 예약자 정보 */}
                    <div className="booking--user--info">
                        <div className="info--title">
                            <span>예약자 정보</span>
                        </div>

                        <div className="booking--user--info--box">
                            <div className="user--info--title">
                                <span>예약자 이름</span>
                            </div>
                            <div>
                                <span>{paymentData?.userName}</span>
                            </div>
                        </div>

                        <div className="booking--user--info--box">
                            <div className="user--info--title">
                                <span>전화번호</span>
                            </div>
                            <div>
                                <span>{paymentData?.userPhone}</span>
                            </div>
                        </div>
                    </div>

                    {/* 결제정보 */}
                    <div className="booking--payment--info">
                        <div className="info--title">
                            <span>결제 정보</span>
                        </div>

                        <div className="payment--info--wrap">
                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>결제 일시</span>
                                </div>

                                <div>
                                    <span>{formatDate(bookData.payDay)}</span>
                                </div>
                            </div>

                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>결제 수단</span>
                                </div>

                                <div>
                                    <span>{paymentData?.payType}</span>
                                </div>
                            </div>
                        </div>

                        <div className="payment--info--wrap">
                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>객실 가격</span>
                                </div>

                                <div>
                                    <span>
                                        {paymentData ? paymentData.roomPrice.toLocaleString() : 0}원
                                    </span>
                                </div>
                            </div>

                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>사용 포인트</span>
                                </div>

                                <div>
                                    <span>
                                        - {paymentData ? paymentData.payPoint.toLocaleString() : 0}P
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="payment--info--wrap">
                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>실 결제 금액</span>
                                </div>

                                <div className="payment--total--price">
                                    <span>
                                        {paymentData ? paymentData.payPrice.toLocaleString() : 0}원
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 취소 정보 */}
                    {paymentType ? (
                        <div className="booking--cancle--info">
                            <div className="info--title">
                                <span>취소 정보</span>
                            </div>

                            <div className="payment--info--wrap">
                                <div className="payment--info--box">
                                    <div className="payment--info--title">
                                        <span>취소 일시</span>
                                    </div>

                                    <div>
                                        <span>{formatDate(paymentData?.cancleDay).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="payment--info--wrap">
                                <div className="payment--info--box">
                                    <div className="payment--info--title">
                                        <span>환불 금액</span>
                                    </div>

                                    <div>
                                        <span>
                                            {paymentData ? paymentData.payPrice.toLocaleString() : 0}원
                                        </span>
                                    </div>
                                </div>

                                <div className="payment--info--box">
                                    <div className="payment--info--title">
                                        <span>환불 포인트</span>
                                    </div>
                                    <span>
                                        + {paymentData ? paymentData.payPoint.toLocaleString() : 0}P
                                    </span>
                                </div>
                            </div>

                            <div className="payment--info--wrap">
                                <div className="payment--info--box">
                                    <div className="payment--info--title">
                                        <span>총 환불 금액</span>
                                    </div>

                                    <div className="payment--total--price">
                                        <span>
                                            {paymentData ? paymentData.roomPrice.toLocaleString() : 0}원
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                {toast && <Toast setToast={setToast} text="주소를 복사했습니다" />}
            </div>
        </Modal>
    );

}
