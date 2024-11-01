import React from 'react'

import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

export default function ({rooms, checkInDate, checkOutDate, peopleMax}) {
    return (
        <div className='room--grid--container'>
            <div className='RoomList'>
                <div className='RoomRow'>
                    <Link to={`/RoomDetail/${rooms.roomNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`}><img src={'../' + rooms.roomThumbnail} alt='룸이미지' className='RoomImg' /></Link>
                    <div>
                        <div className='RoomInfo'>
                            <div className='InfoBox'>
                                <div className='RoomName'><Link to={`/RoomDetail/${rooms.roomNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`} id='nameLink'>{rooms.roomName}</Link></div>
                                <div className='PTBox'>
                                    <div className='PersonCount'><IoPersonOutline /> {rooms.roomPeopleInfo}</div>
                                    <div className='RoomTime'><FaRegClock /> 체크인 {rooms.roomCheckinTime.slice(0, 5)} ~ 체크아웃 {rooms.roomCheckoutTime.slice(0, 5)}</div>
                                </div>
                            </div>
                            <div className='RoomPrice'>
                                {rooms.availableRooms > 0 ? 
                                    rooms.roomDiscount > 0 ? (
                                        <>
                                        <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='Discount'>{rooms.roomDiscount}%</div>
                                            <div className='DiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                        </div>
                                        <div className='RoomCount'>남은 객실 {rooms.availableRooms}개</div>
                                        <div className='RoomBtn'>
                                            <Link to='/예약' className='rBtn'>예약하기</Link>
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                        <div className='RoomDiscount'>
                                            <div className='DiscountPrice'>{rooms.discountPrice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                        </div>
                                        <div className='RoomCount'>남은 객실 {rooms.availableRooms}개</div>
                                        <div className='RoomBtn'>
                                            <Link to='/예약' className='rBtn'>예약하기</Link>
                                        </div>
                                        </>
                                    )
                                        
                                 :  rooms.roomDiscount > 0 ? (
                                    <>
                                        <div className='RealPrice'>{rooms.roomPrice.toLocaleString()}원</div>
                                        <div className='RoomDiscount'>
                                            <div className='sDiscount'>{rooms.roomDiscount}%</div>
                                            <div className='sDiscountPrice'>{rooms.roomDcprice.toLocaleString()}원<span id='bak'>/1박</span></div>
                                        </div>
                                        <div className='RoomBtn'>
                                            <button disabled className='srBtn'>예약마감</button>
                                        </div>
                                    </>
                                 ) : (
                                    <>  
                                        <div className='RoomDiscount'>
                                            <div className='sDiscountPrice'>{rooms.roomDcprice.toLocaleString()}원<span id='bak'>/1박</span></div>
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
