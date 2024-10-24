import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function RoomNav({info}) {




  return (
    <div className='room--nav--container'>
        <div className='roomDiv'>
            <div>
                <div>{info.hotelName} - {info.roomName}</div>
                <div className='NavDate'>{info.InDate} ~ {info.OutDate}</div>
            </div>

            <div className='PriceBox'>
                {info.discount == 0 ? (
                    <div className='Price'>{info.roomPrice.toLocaleString()}원</div>
                ) : (
                    <div className='Price'>{info.roomDcprice.toLocaleString()}원</div>
                )}
                <Link><Button className='navBtn'>예약하기</Button></Link>
            </div>
        </div>
    </div>
  )
}
