import React from 'react'
import './HotelList.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function hotelList() {

  return (
    <Container className='HotelList'>
      <div className='HotelGrid'>
        <div className='HotelRow'>
          <div className='HotelCol'>
            <img src='/HotelList/호텔1.jpg' className='HotelImg'/>
            <div className='HotelInfo'>
              <p>등급분류</p>
              호텔명
              위치
              후기평점
            </div>
            <div className='HotelPrice'>
              411,400원
            </div>
          </div>
        </div> 
      </div>
    </Container>
  )
}
