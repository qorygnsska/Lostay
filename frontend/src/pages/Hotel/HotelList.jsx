import React from 'react'
import './HotelList.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function hotelList() {

  return (
    <Container className='HotelList'>
      <div className='HotelGrid'>
        <Row className='HotelRow'>
          <Col className='HotelCol'>
            <img src='/HotelList/호텔1.jpg'></img>
          </Col>
        </Row> 
      </div>
    </Container>
  )
}
