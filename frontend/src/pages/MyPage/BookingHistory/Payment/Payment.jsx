import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackNav from "../../../../componets/BackNav/BackNav";
import Navbar from "../../../../componets/Navbar/Navbar";
import { PiCopyBold } from "react-icons/pi";
import Toast from "../../../../componets/Toast/Toast";
import { privateApi } from '../../../../api/api'

export default function Payment() {
    const location = useLocation();
    const paymentType = location.state?.paymentType;
    const payNo = location.state.payNo;
    const payDay = location.state.payDay;
    const hotelThumbnail = location.state.hotelThumbnail;
    const roomCheckInTime = location.state.roomCheckInTime;
    const roomCheckOutTime = location.state.roomCheckOutTime;
    const checkInDate = location.state.checkInDate;
    const checkOutDate = location.state.checkOutDate;
    const checkInDayOfWeek = location.state.checkInDayOfWeek;
    const checkOutDayOfWeek = location.state.checkOutDayOfWeek;
    const nights = location.state.nights;



    const [toast, setToast] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const getDatas = async (activeTab) => {

        try {
            const response = await privateApi.get(`/PaymentHistory?payNo=${payNo}`); // API 요청
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

    return (
        <div className="payment--container">
            <BackNav title={paymentType ? "취소 내역" : "결제 내역"} />

            {/* 예약한 호텔 정보 */}
            <div className="payment--wrap">
                <div className="booking--hotel--info">
                    <img src={hotelThumbnail} alt="호텔 이미지" />

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
                                {checkInDate} {checkInDayOfWeek} ~ {checkOutDate} {checkOutDayOfWeek} | {nights}
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
                                <span>{payDay}</span>
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
                                    {paymentData?.roomPrice ? paymentData.roomPrice.toLocaleString() : 0}원
                                </span>
                            </div>
                        </div>

                        <div className="payment--info--box">
                            <div className="payment--info--title">
                                <span>사용 포인트</span>
                            </div>

                            <div>
                                <span>
                                    - {paymentData?.usePoint ? paymentData.usePoint.toLocaleString() : 0}P
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
                                    {paymentData?.payPrice ? paymentData.payPrice.toLocaleString() : 0}원
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
                                    <span>{paymentData?.payDay}</span>
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
                                        {paymentData?.payPrice ? paymentData.payPrice.toLocaleString() : 0}원
                                    </span>
                                </div>
                            </div>

                            <div className="payment--info--box">
                                <div className="payment--info--title">
                                    <span>환불 포인트</span>
                                </div>
                                <span>
                                    + {paymentData?.payPoint ? paymentData.payPoint.toLocaleString() : 0}P
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
                                        {paymentData?.roomPrice.toLocaleString() ? paymentData.roomPrice.toLocaleString() : 0}원
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            {toast && <Toast setToast={setToast} text="주소를 복사했습니다" />}
            <Navbar />
        </div>
    );
}
