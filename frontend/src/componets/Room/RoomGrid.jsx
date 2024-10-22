import React from 'react'

import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

export default function ({rooms}) {
    return (
        <div className='room--grid--container'>
            <div className='RoomList'>
                <div className='RoomRow'>
                    <img src={rooms.thumbnail} alt='룸이미지' className='RoomImg' />
                    <div>
                        <div className='RoomInfo'>
                            <div className='InfoBox'>
                                <div className='RoomName'>{rooms.name}</div>
                                <div className='PTBox'>
                                    <div className='PersonCount'><IoPersonOutline /> 기준 {rooms.p1}인 / 최대 {rooms.p2}인</div>
                                    <div className='RoomTime'><FaRegClock /> 체크인 {rooms.checkIn} ~ 체크아웃 {rooms.checkOut}</div>
                                </div>
                            </div>
                            <div className='RoomPrice'>
                                {rooms.roomCount > 0 ? (
                                    <>
                                        <div className='RealPrice'>{rooms.realPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='Discount'>{rooms.discount}%</div>
                                            <div className='DiscountPrice'>{rooms.discountPrice.toLocaleString()}원</div>
                                        </div>
                                        <div className='RoomCount'>남은 객실 {rooms.roomCount}개</div>
                                        <div className='RoomBtn'>
                                            <Link to='/예약' className='rBtn'>예약하기</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='RealPrice'>{rooms.realPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='sDiscount'>{rooms.discount}%</div>
                                            <div className='sDiscountPrice'>{rooms.discountPrice.toLocaleString()}원</div>
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
