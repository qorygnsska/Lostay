import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { privateApi } from '../../api/api';

export default function RoomNav({ info }) {

    const price = info.period * info.discountPrice;

    const navigate = useNavigate();

    console.log(info)

    // 결제페이지 이동
    const GoToReservation = async (roomNo) => {
        try {
            // API 요청
            const response = await privateApi.post('/room/Reservation', {
                roomNo: roomNo,
                checkInDay: info.checkInDay,
                checkOutDay: info.checkOutDay,
            });

            // 응답이 성공적일 경우
            if (response.status === 200) {
                navigate(`/reservation?roomNo=${roomNo}&rid=${response.data}&checkInDate=${info.checkInDay}&checkOutDate=${info.checkOutDay}`);
            } else {
                alert('이미 예약이 마감되었습니다.')
            }
        } catch (error) {
            alert('이미 예약이 마감되었습니다.')
        }

    }

    return (
        <div className='room--nav--container'>
            <div className='roomDiv'>
                <div>
                    <div className='infoName'>{info.hotelName} - {info.roomName}</div>
                    <div className='NavDate'>{info.checkInDay} ~ {info.checkOutDay} ({info.period}박)</div>
                </div>

                <div className='PriceBox'>
                    <div className='Price'>{price.toLocaleString()}원</div>
                    {info.availableRooms === 0 ? (
                        <Button className='navSBtn' disabled>예약마감</Button>
                    ) : (
                        <div onClick={() => GoToReservation(info.roomNo)} className='navBtn'>예약하기</div>
                    )}

                </div>
            </div>
        </div>
    )
}
