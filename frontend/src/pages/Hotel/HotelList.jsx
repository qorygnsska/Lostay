import React from 'react'
import './HotelList.css';

import Container from 'react-bootstrap/Container';
import { FaStar } from "react-icons/fa6";

export default function hotelList() {

  return (
    <Container className='HotelList'>
      <div className='HotelGrid'>
        <div className='HotelRow'>
          <div className='HotelCol'>
            <img src='/HotelList/호텔1.jpg' className='HotelImg'/>
            <div className='HotelInfo'>
              <div className='HotelRank'>블랙·5성급·호텔</div>
              <div className='HotelName'>제주신라호텔</div>
              <div className='HotelLo'>서귀포시</div>
              <div className='StarDiv'>
                <div className='Star'>
                  <FaStar className='StarIcon'/>
                   <div className='StarNum'>9.6</div>
                </div>
                <span className='StarCount'>901명 평가</span>
              </div>
            </div>
            <div className='HotelPrice'>
              <div className='RealPrice'>300,000원</div>
              <div className='HotelDiscount'>
                <div className='Discount'>10%</div>
                <div className='DiscountPrice'>270,000원</div>
              </div>
            </div>
          </div>
          <div className='RowLine'></div>
        </div> 
      </div>
    </Container>
  )
}
