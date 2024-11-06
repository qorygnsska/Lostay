import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import axios from 'axios';
import { privateApi } from '../../api/api';

export default function RoomGrid({ rooms, fetchHotelRoomList, checkInDate, checkOutDate, peopleMax, hotelNo }) {
    const navigate = useNavigate();

    // 결제페이지 이동
    const GoToReservation = async (roomNo) => {
        try {
            // API 요청
            const response = await privateApi.post('/room/Reservation', {
                roomNo: roomNo,
                checkInDay: checkInDate,
                checkOutDay: checkOutDate,
            });

            // 응답이 성공적일 경우
            if (response.status === 200) {
                navigate(`/reservation?roomNo=${roomNo}&rid=${response.data}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}&hotelNo=${hotelNo}`);
            } else {
                alert('이미 예약이 마감되었습니다.')
                fetchHotelRoomList()
            }
        } catch (error) {
            alert('이미 예약이 마감되었습니다.')
            fetchHotelRoomList()
        }

    }

    return (
        <div className='room--grid--container'>
            <div className='RoomList'>
                <div className='RoomRow'>
                    <Link to={`/RoomDetail/${rooms.roomNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}&hotelNo=${hotelNo}`}><img src={'../' + rooms.roomThumbnail} alt='룸이미지' className='RoomImg' /></Link>
                    <div>
                        <div className='RoomInfo'>
                            <div className='InfoBox'>
                                <div className='RoomName'><Link to={`/RoomDetail/${rooms.roomNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}&hotelNo=${hotelNo}`} id='nameLink'>{rooms.roomName}</Link></div>
                                <div className='PTBox'>
                                    <div className='PersonCount'><IoPersonOutline /> {rooms.roomPeopleInfo}</div>
                                    <div className='RoomTime'><FaRegClock /> 체크인 {rooms.roomCheckinTime.slice(0, 5)} ~ 체크아웃 {rooms.roomCheckoutTime.slice(0, 5)}</div>
                                </div>
                            </div>
                            <div className='RoomPrice'>
                                {rooms.availableRoomsCnt > 0 ?
                                    rooms.roomDiscount > 0 ? (
                                        <>
                                            <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                            <div className='RoomDiscount'>
                                                <div className='Discount'>{rooms.roomDiscount}%</div>
                                                <div className='DiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                            </div>
                                            <div className='RoomCount'>남은 객실 {rooms.availableRoomsCnt}개</div>
                                            <div className='RoomBtn'>
                                                <div onClick={() => GoToReservation(rooms.roomNo)} className='rBtn'>예약하기</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='RoomDiscount'>
                                                <div className='DiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                            </div>
                                            <div className='RoomCount'>남은 객실 {rooms.availableRoomsCnt}개</div>
                                            <div className='RoomBtn'>
                                                <div onClick={() => GoToReservation(rooms.roomNo)} className='rBtn'>예약하기</div>
                                            </div>
                                        </>
                                    )

                                    : rooms.roomDiscount > 0 ? (
                                        <>
                                            <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                            <div className='RoomDiscount'>
                                                <div className='sDiscount'>{rooms.roomDiscount}%</div>
                                                <div className='sDiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                            </div>
                                            <div className='RoomBtn'>
                                                <button disabled className='srBtn'>예약마감</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='RoomDiscount'>
                                                <div className='sDiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                            </div>
                                            <div className='RoomBtn'>
                                                <button disabled className='srBtn'>예약마감</button>
                                            </div>
                                        </>

                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
