import React from 'react'

import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

export default function ({rooms}) {
    return (
        <div className='room--grid--container'>
            <div className='RoomList'>
                <div className='RoomRow'>
                    <img src={rooms.roomThumbnail} alt='룸이미지' className='RoomImg' />
                    <div>
                        <div className='RoomInfo'>
                            <div className='InfoBox'>
                                <div className='RoomName'>{rooms.roomName}</div>
                                <div className='PTBox'>
                                    <div className='PersonCount'><IoPersonOutline /> {rooms.roomPeopleInfo}</div>
                                    <div className='RoomTime'><FaRegClock /> 체크인 {rooms.roomCheckinTime} ~ 체크아웃 {rooms.roomCheckoutTime}</div>
                                </div>
                            </div>
                            <div className='RoomPrice'>
                                {rooms.availableRooms > 0 ? (
                                    <>
                                        <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='Discount'>{rooms.roomDiscount}%</div>
                                            <div className='DiscountPrice'>{rooms.roomDcprice.toLocaleString()}원</div>
                                        </div>
                                        <div className='RoomCount'>남은 객실 {rooms.availableRooms}개</div>
                                        <div className='RoomBtn'>
                                            <Link to='/예약' className='rBtn'>예약하기</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='sDiscount'>{rooms.roomDiscount}%</div>
                                            <div className='sDiscountPrice'>{rooms.roomDcprice.toLocaleString()}원</div>
                                        </div>
                                        <div className='RoomBtn'>
                                            <button disabled className='srBtn'>예약마감</button>
                                        </div>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
