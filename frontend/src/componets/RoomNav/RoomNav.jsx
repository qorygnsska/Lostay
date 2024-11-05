import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function RoomNav({ info }) {

    const price = info.period * info.discountPrice;

    return (
        <div className='room--nav--container'>
            <div className='roomDiv'>
                <div>
                    <div className='infoName'>{info.hotelName} - {info.roomName}</div>
                    <div className='NavDate'>{info.checkInDay} ~ {info.checkOutDay} ({info.period}박)</div>
                </div>

                <div className='PriceBox'>
                    <div className='Price'>{price.toLocaleString()}원</div>
                    {info.availableRooms == 0 ? (
                        <Button className='navSBtn' disabled>예약마감</Button>
                    ) : (
                        <Link to={`/reservation?roomNo=${info.roomNo}`}><Button className='navBtn'>예약하기</Button></Link>
                    )}

                </div>
            </div>
        </div>
    )
}
