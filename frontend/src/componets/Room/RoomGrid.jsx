import React from 'react'

export default function (rooms) {
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
                                <div className='RealPrice'>{rooms.realPrice}원</div>
                                <div className='RoomDiscount'>
                                    <div className='Discount'>{rooms.discount}%</div>
                                    <div className='DiscountPrice'>{rooms.discountPrice}원</div>
                                </div>
                                <div className='RoomCount'>남은 객실 {rooms.roomCount}개</div>
                                <div className='RoomBtn'>
                                    <Link to='/예약' className='rBtn'>예약하기</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
