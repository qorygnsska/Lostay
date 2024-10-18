import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import BackNav from '../../../../componets/BackNav/BackNav';
import Navbar from '../../../../componets/Navbar/Navbar';
import { PiCopyBold } from "react-icons/pi";
import Toast from '../../../../componets/Toast/Toast';

export default function Payment() {
    const location = useLocation();
    const paymentType = location.state?.paymentType;
    const payNo = location.state.payNo;
    const roomNo = location.state.roomNo;

    const [toast, setToast] = useState(false);


    const payment = {
        image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
        hotelName: '이비스 엠버서더 부산 시티센터',
        hotelAddress: '부산 수영구 민락동 181-170',
        checkInDate: '2024.11.03 (일)',
        checkOutDate: '2024.11.04 (월)',
        userName: '김정준',
        userPhone: '010-9920-2202',
        payDay: '2023.12.21 (목) 21:42',
        payType: '네이버페이',
        roomPrice: 360000,
        usePoint: 5000,
        payPrice: 355000,
        cancleDate: '2024.12.22(금) 22:42',
        canclePrice: 350000,
        cnaclePoint: 5000

    }

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
        <div className='payment--container'>

            <BackNav title={paymentType ? '취소 내역' : '결제 내역'} />

            {/* 예약한 호텔 정보 */}
            <div className='payment--wrap'>
                <div className='booking--hotel--info'>
                    <img src={`HotelList/${payment.image}`} alt='호텔 이미지' />

                    <div className='hotel--info--box'>
                        <div className='hotel--name'>
                            <span>{payment.hotelName}</span>
                        </div>

                        <div className='hotel--content'>
                            <span>{payment.hotelAddress}</span>
                            <button onClick={() => handleCopyClipBoard(payment.hotelAddress)}>
                                <PiCopyBold className='icon' /> 주소 복사
                            </button>
                        </div>

                        <div className='hotel--content'>
                            <span>{payment.checkInDate} ~ {payment.checkOutDate}</span>
                        </div>
                    </div>
                </div>

                {/* 예약자 정보 */}
                <div className='booking--user--info'>
                    <div className='info--title'>
                        <span>예약자 정보</span>
                    </div>

                    <div className='booking--user--info--box'>
                        <div className='user--info--title'>
                            <span>예약자 이름</span>
                        </div>
                        <div>
                            <span>{payment.userName}</span>
                        </div>

                    </div>

                    <div className='booking--user--info--box'>
                        <div className='user--info--title'>
                            <span>전화번호</span>
                        </div>
                        <div>
                            <span>{payment.userPhone}</span>
                        </div>
                    </div>
                </div>

                {/* 결제정보 */}
                <div className='booking--payment--info'>
                    <div className='info--title'>
                        <span>결제 정보</span>
                    </div>

                    <div className='payment--info--wrap'>
                        <div className='payment--info--box'>
                            <div className='payment--info--title'>
                                <span>결제 일시</span>
                            </div>

                            <div>
                                <span>{payment.payDay}</span>
                            </div>

                        </div>

                        <div className='payment--info--box'>
                            <div className='payment--info--title'>
                                <span>결제 수단</span>
                            </div>

                            <div>
                                <span>{payment.payType}</span>
                            </div>

                        </div>
                    </div>

                    <div className='payment--info--wrap'>
                        <div className='payment--info--box'>
                            <div className='payment--info--title'>
                                <span>객실 가격</span>
                            </div>

                            <div>
                                <span>{payment.roomPrice.toLocaleString()}원</span>
                            </div>

                        </div>

                        <div className='payment--info--box'>
                            <div className='payment--info--title'>
                                <span>사용 포인트</span>
                            </div>

                            <div>
                                <span>- {payment.usePoint.toLocaleString()}P</span>
                            </div>

                        </div>
                    </div>

                    <div className='payment--info--wrap'>
                        <div className='payment--info--box'>
                            <div className='payment--info--title'>
                                <span>실 결제 금액</span>
                            </div>

                            <div className='payment--total--price'>
                                <span>{payment.payPrice.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 취소 정보 */}
                {
                    paymentType ? (
                        <div className='booking--cancle--info'>
                            <div className='info--title'>
                                <span>취소 정보</span>
                            </div>

                            <div className='payment--info--wrap'>
                                <div className='payment--info--box'>
                                    <div className='payment--info--title'>
                                        <span>취소 일시</span>
                                    </div>

                                    <div>
                                        <span>{payment.payDay}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='payment--info--wrap'>
                                <div className='payment--info--box'>
                                    <div className='payment--info--title'>
                                        <span>환불 금액</span>
                                    </div>

                                    <div>
                                        <span>{payment.canclePrice.toLocaleString()}원</span>
                                    </div>
                                </div>

                                <div className='payment--info--box'>
                                    <span>환불 포인트</span>
                                    <span>+ {payment.cnaclePoint.toLocaleString()}P</span>
                                </div>
                            </div>

                            <div className='payment--info--wrap'>
                                <div className='payment--info--box'>
                                    <div className='payment--info--title'>
                                        <span>총 환불 금액</span>
                                    </div>

                                    <div className='payment--total--price'>
                                        <span>{payment.payPrice.toLocaleString()}원</span>

                                    </div>
                                </div>
                            </div>
                        </div>) : null
                }
            </div>
            {toast && <Toast setToast={setToast} text="주소를 복사했습니다" />}
            <Navbar />
        </div>
    )
}
